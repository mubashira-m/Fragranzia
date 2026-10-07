import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const API_URL = "http://localhost:5000/products";

function Product() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();


  // GET PRODUCTS

  const getProducts = async () => {
    try {

      const response = await axios.get(API_URL);

      setProducts(response.data);

    } catch (error) {

      console.log("GET PRODUCTS ERROR:", error);

    }
  };


  useEffect(() => {

    getProducts();

  }, []);


  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API_URL}/${id}`);

      getProducts();

    } catch (error) {

      console.log("DELETE ERROR:", error);

    }
  };


  // BLOCK / UNBLOCK

  const toggleBlock = async (id) => {

    try {

      await axios.put(`${API_URL}/${id}/block`);

      getProducts();

    } catch (error) {

      console.log("BLOCK ERROR:", error);

    }
  };


  return (

    <div className="product-page">

      {/* HEADER */}

      <div className="product-header">

        <div>

          <h1>Products</h1>

          <p>Manage your products</p>

        </div>


        {/* ADD PRODUCT */}

        <button
          className="add-btn"
          onClick={() => navigate("/admin/products/add")}
        >
          + Add Product
        </button>

      </div>


      {/* EXPORT / IMPORT */}

      <div className="top-buttons">

        <button>
          Export
        </button>

        <button>
          Import
        </button>

      </div>


      {/* TABLE */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Product Name</th>

              <th>Category</th>

              <th>Price</th>

              <th>Sale Price</th>

              <th>Stock</th>

              <th>Actions</th>

              <th>Status</th>

            </tr>

          </thead>


          <tbody>

            {products.map((product) => (

              <tr key={product._id}>

                <td>
                  {product.name}
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>
                  ₹{product.salePrice}
                </td>

                <td>
                  {product.stock}
                </td>


                <td className="actions">

                  {/* SHOW */}

                  <button
                    className="show-btn"
                    onClick={() =>
                      navigate(
                        `/admin/products/${product._id}`
                      )
                    }
                  >
                    👁 Show
                  </button>


                  {/* EDIT */}

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/admin/products/edit/${product._id}`
                      )
                    }
                  >
                    ✎ Edit
                  </button>


                  {/* DELETE */}

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                  >
                    Delete
                  </button>

                </td>


                <td>

                  <button
                    className={
                      product.blocked
                        ? "unblock-btn"
                        : "block-btn"
                    }
                    onClick={() =>
                      toggleBlock(product._id)
                    }
                  >

                    {product.blocked
                      ? "Unblock"
                      : "Block"}

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Product;