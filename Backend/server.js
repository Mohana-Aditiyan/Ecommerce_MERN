const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));


app.get("/", (req, res) => {
  res.send("API running...");
});
const bcrypt = require('bcryptjs');

// bcrypt.hash('Mohan@123', 10).then(hash => {
//   console.log(hash);
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
