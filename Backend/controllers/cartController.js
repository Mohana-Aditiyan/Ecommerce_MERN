const db = require("../config/db");

exports.addToCart = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id) {
      return res
        .status(400)
        .json({ message: "user_id and product_id required" });
    }

    if (quantity && quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Validate product exists
    const [productRows] = await connection.execute(
      "SELECT id FROM products WHERE id = ?",
      [product_id]
    );

    if (productRows.length === 0) {
      return res.status(400).json({ message: "Invalid product_id" });
    }

    await connection.beginTransaction();

    // Check cart
    const [cartRows] = await connection.execute(
      "SELECT id FROM carts WHERE user_id = ?",
      [user_id]
    );

    let cartId;

    if (cartRows.length === 0) {
      const [cartResult] = await connection.execute(
        "INSERT INTO carts (user_id) VALUES (?)",
        [user_id]
      );
      cartId = cartResult.insertId;
    } else {
      cartId = cartRows[0].id;
    }

    // Check item
    const [itemRows] = await connection.execute(
      "SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, product_id]
    );

    if (itemRows.length > 0) {
      await connection.execute(
        "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
        [quantity || 1, itemRows[0].id]
      );
    } else {
      await connection.execute(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
        [cartId, product_id, quantity || 1]
      );
    }

    await connection.commit();
    res.json({ message: "Product added to cart" });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
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
         p.description,   
        ci.quantity
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`,
      [cartId]
    );

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
