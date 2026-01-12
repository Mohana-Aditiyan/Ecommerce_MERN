const db = require("../config/db");

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({ message: "user_id and product_id required" });
    }

    // 1. Check if cart exists
    const [cartRows] = await db.execute(
      "SELECT id FROM carts WHERE user_id = ?",
      [user_id]
    );

    let cartId;

    if (cartRows.length === 0) {
      // create cart
      const [cartResult] = await db.execute(
        "INSERT INTO carts (user_id) VALUES (?)",
        [user_id]
      );
      cartId = cartResult.insertId;
    } else {
      cartId = cartRows[0].id;
    }

    // 2. Check if product already in cart
    const [itemRows] = await db.execute(
      "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, product_id]
    );

    if (itemRows.length > 0) {
      // update quantity
      await db.execute(
        "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
        [quantity || 1, itemRows[0].id]
      );
    } else {
      // add new item
      await db.execute(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, product_id, quantity || 1]
      );
    }

    res.json({ message: "Product added to cart" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getCartByUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "user_id required" });
    }

    const [cartRows] = await db.execute(
      "SELECT id FROM carts WHERE user_id = ?",
      [user_id]
    );

    if (cartRows.length === 0) {
      return res.json([]);
    }

    const cartId = cartRows[0].id;

    const [items] = await db.execute(
      `SELECT 
        ci.id AS cart_item_id,
        p.id AS product_id,
        p.name,
        p.price,
        p.category,
        ci.quantity
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
