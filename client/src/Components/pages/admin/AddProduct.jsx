import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

const API_URL = "http://localhost:5000/products";

function AddProduct() {

  const navigate = useNavigate();
const [image, setImage] = useState(null);


  const [formData, setFormData] = useState({

    name: "",
    category: "",
    price: "",
    salePrice: "",
    stock: "",
    image: "",
    description: "",

  });

const handleImageChange = (e) => {

  setImage(e.target.files[0]);

};
  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  // ADD PRODUCT

  
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = new FormData();


    data.append("name", formData.name);

    data.append("category", formData.category);

    data.append("price", formData.price);

    data.append("salePrice", formData.salePrice);

    data.append("stock", formData.stock);

    data.append("description", formData.description);


    if (image) {

      data.append("image", image);

    }


    await axios.post(
      "http://localhost:5000/products",
      data
    );


    alert("Product added successfully!");


    navigate("/admin/products");


  } catch (error) {

    console.log(
      "ADD PRODUCT ERROR:",
      error
    );

  }

};


  return (

    <div className="add-product-page">


      {/* HEADER */}

      <div className="add-product-header">

        <div>

          <h1>Add Product</h1>

          <p>
            Add a new product to your store
          </p>

        </div>


        <button
          className="back-btn"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          ← Back to Products
        </button>

      </div>



      {/* FORM CARD */}

      <div className="add-product-card">


        <form onSubmit={handleSubmit}>


          {/* PRODUCT INFORMATION */}

          <h2>Product Information</h2>

          <div className="form-grid">


            {/* NAME */}

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

            </div>


            {/* CATEGORY */}

            <div className="form-group">

              <label>
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="Floral">
                  Floral
                </option>

                <option value="Woody">
                  Woody
                </option>

                <option value="Fresh">
                  Fresh
                </option>

                <option value="Sweet">
                  Sweet
                </option>

                <option value="Oriental">
                  Oriental
                </option>

              </select>

            </div>


            {/* PRICE */}

            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="₹ Enter price"
                required
              />

            </div>


            {/* SALE PRICE */}

            <div className="form-group">

              <label>
                Sale Price
              </label>

              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="₹ Enter sale price"
                required
              />

            </div>


            {/* STOCK */}

            <div className="form-group">

              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                required
              />

            </div>


            {/* IMAGE */}

            <div className="form-group">

  <label>
    Product Image
  </label>

  <input
    type="file"
    name="image"
    accept="image/png,image/jpeg,image/jpg,image/webp"
    onChange={handleImageChange}
  />

</div>

          </div>


          {/* DESCRIPTION */}

          <div className="form-group full-width">

            <label>
              Product Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />

          </div>


          {/* BUTTONS */}

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/admin/products")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="submit-product-btn"
            >
              Add Product
            </button>

          </div>


        </form>

      </div>

    </div>

  );

}

export default AddProduct;