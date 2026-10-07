const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./Config/db");

const categoryRoutes = require("./Routes/CategoryRoutes");
const productRoutes = require("./Routes/productRoutes");

const app = express();

const PORT = 5000;

connectDb();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});