const db = require("../config/db");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, discount, category, stock, description } = req.body;

    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    await db.execute(
      `INSERT INTO products 
       (name, price, discount, category, stock, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        price,
        discount || 0,
        category || null,
        stock || 0,
        description || null
      ]
    );

    res.status(201).json({ message: "Product created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getProductsWithFilter = async (req, res) => {
  try {
    const { category, search } = req.body;

    let query = "SELECT * FROM products WHERE 1=1";
    let values = [];

    // Category filter
    if (category && category.trim() !== "") {
      query += " AND category = ?";
      values.push(category);
    }

    // Search filter (product name)
    if (search && search.trim() !== "") {
      query += " AND name LIKE ?";
      values.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const [products] = await db.execute(query, values);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

