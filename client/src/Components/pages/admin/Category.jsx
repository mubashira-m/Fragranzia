
import { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";

function Category() {

  const API_URL = "http://localhost:5000/categories";

  // Show / hide side panel
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Add or Edit mode
  const [editMode, setEditMode] = useState(false);

  // Selected category id
  const [editId, setEditId] = useState(null);

  // Form values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Categories
  const [categories, setCategories] = useState([]);


  // GET CATEGORIES
  const getCategories = async () => {
    try {

      const response = await axios.get(API_URL);

      setCategories(response.data);

    } catch (error) {

      console.log("GET CATEGORIES ERROR:", error);

    }
  };


  // Load categories when page opens
  useEffect(() => {

    // getCategories();

  }, []);


  // OPEN ADD CATEGORY
  const handleOpenAdd = () => {

    setEditMode(false);

    setEditId(null);

    setName("");

    setDescription("");

    setShowAddCategory(true);
  };


  // OPEN EDIT CATEGORY
  const handleEdit = (category) => {

    // Change to edit mode
    setEditMode(true);

    // Save selected category id
    setEditId(category._id);

    // Put selected category data into inputs
    setName(category.name);

    setDescription(category.description);

    // Open side panel
    setShowAddCategory(true);
  };


  // ADD OR UPDATE CATEGORY
  const handleSubmit = async () => {

    if (
      name.trim() === "" ||
      description.trim() === ""
    ) {

      alert("Please fill all fields");

      return;
    }


    try {

      // EDIT CATEGORY
      if (editMode) {

        const response = await axios.put(
          `${API_URL}/${editId}`,
          {
            name: name,
            description: description
          }
        );


        // Update category in React
        setCategories(
          categories.map((category) =>
            category._id === editId
              ? response.data
              : category
          )
        );


        alert("Category updated successfully");

      }

      // ADD CATEGORY
      else {

        const response = await axios.post(
          API_URL,
          {
            name: name,
            description: description
          }
        );


        // Add new category to React
        setCategories([
          ...categories,
          response.data
        ]);


        alert("Category added successfully");
      }


      // Clear form
      setName("");

      setDescription("");

      setEditId(null);

      setEditMode(false);

      // Close panel
      setShowAddCategory(false);


    } catch (error) {

      console.log("CATEGORY ERROR:", error);

      alert("Something went wrong");
    }
  };


  // BLOCK / UNBLOCK
  const handleStatus = async (id) => {

    try {

      const response = await axios.put(
        `${API_URL}/${id}/status`
      );


      setCategories(
        categories.map((category) =>
          category._id === id
            ? response.data
            : category
        )
      );

    } catch (error) {

      console.log("STATUS ERROR:", error);

    }
  };


  // CLOSE PANEL
  const handleClose = () => {

    setShowAddCategory(false);

    setName("");

    setDescription("");

    setEditMode(false);

    setEditId(null);
  };


  return (

    <div className="page">


      {/* HEADER */}

      <div className="page-header">

        <div>

          <h2>Categories</h2>

        </div>


        <button
          className="add-category-btn"
          onClick={handleOpenAdd}
        >
          + Add Category
        </button>

      </div>



      {/* MAIN AREA */}

      <div className="content-area">


        {/* CATEGORY TABLE */}

        <div
          className={`category-table ${
            showAddCategory
              ? "table-small"
              : ""
          }`}
        >


          {/* TABLE HEADER */}

          <div className="table-head">

            <div>Name</div>

            <div>Description</div>

            <div>Actions</div>

            <div>Status</div>

          </div>



          {/* CATEGORY ROWS */}

          {categories.map((category) => (

            <div
              className="table-row"
              key={category._id}
            >


              {/* NAME */}

              <div>

                {category.name}

              </div>



              {/* DESCRIPTION */}

              <div>

                {category.description}

              </div>



              {/* EDIT */}

              <div>

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(category)
                  }
                >
                  ✏️ Edit
                </button>

              </div>



              {/* STATUS */}

              <div>

                <button
                  className={
                    category.status === "Block"
                      ? "status-block"
                      : "status-unblock"
                  }

                  onClick={() =>
                    handleStatus(category._id)
                  }
                >
                  {category.status}
                </button>

              </div>


            </div>

          ))}

        </div>



        {/* ADD / EDIT SIDE PANEL */}

        {showAddCategory && (

          <div className="add-category-panel">


            {/* PANEL HEADER */}

            <div className="panel-header">

              <h3>

                {editMode
                  ? "Edit Category"
                  : "Add Category"}

              </h3>


              <button
                className="close-btn"
                onClick={handleClose}
              >
                ×
              </button>

            </div>



            {/* CATEGORY NAME */}

            <div className="form-group">

              <label>
                Category Name
              </label>


              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>



            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Description
              </label>


              <textarea
                placeholder="Enter category description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              ></textarea>

            </div>



            {/* BUTTONS */}

            <div className="panel-buttons">


              <button
                className="cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>


              <button
                className="save-btn"
                onClick={handleSubmit}
              >

                {editMode
                  ? "Update Category"
                  : "Add Category"}

              </button>


            </div>


          </div>

        )}

      </div>

    </div>
  );
}

export default Category;
