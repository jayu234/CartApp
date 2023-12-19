import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { createProduct, resetNewProductState } from "../store/productSlice";
const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, isLoading } = useSelector((state) => state.product.newProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("unit_price", unitPrice);
    formData.append("image", imageFile);

    dispatch(createProduct(formData));

    setImageFile(null);
    setDescription("");
    setProductName("");
    setQuantity("");
    setUnitPrice("");
    setPreviewUrl("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file)
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (success) {
      dispatch(resetNewProductState());
      navigate("/");
    }
  }, [isLoading])
  return (
    <div className="w-75 mx-auto container border rounded-3 mt-3 mb-2 p-4">
      <h3 className="mb-3">Create Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="productImage"
            onChange={handleImageChange}
            required
          />
        </div>
        {previewUrl && (
          <img src={previewUrl} alt="Image Preview" className="img-thumbnail" style={{maxWidth: "500px", maxHeight: "300px"}}/>
        )}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            className="form-control"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unitPrice" className="form-label">
            Unit Price
          </label>
          <input
            type="text"
            name="unitPrice"
            className="form-control"
            id="unitPrice"
            placeholder="Enter unit price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2"
          disabled={!productName || !description || !imageFile || (quantity <= 0) || (unitPrice <= 0)}
        >
          Create Product
        </button>
        <button type="submit" className="btn btn-outline-primary" onClick={() => { navigate("/") }}>
          Cancle
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
