import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getProductsDetails } from "../store/productSlice";
import { addItem, resetAddItemState } from "../store/cartSlice";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data, success, isError } = useSelector((state) => state.product.productDetails);
  const { newItem, items } = useSelector((state) => state.cart)
  useEffect(() => {
    dispatch(getProductsDetails(id));
  }, [id, dispatch])

  useEffect(() => {
    if (success) {
      setProduct(data);
    }
    if (isError) {
      setProduct(null);
    }
  }, [isLoading])

  useEffect(() => {
    if (newItem.success) {
      dispatch(resetAddItemState());
      navigate("/cart");
    }
  }, [newItem.isLoading])
  const isItemInCart = items.data.findIndex((item) => item.product._id === id) !== -1;
  const handleButtonClick = () => {
    if (isItemInCart) {
      navigate("/cart");
    } else {
      dispatch(addItem({ p_id: id }))
    }
  }
  return (
    <div className="w-75 mx-auto border rounded-3 mt-4 row row-cols-2 p-4">
      <div className="col-4 d-flex flex-column">
        <img src={`${import.meta.env.VITE_BACKEND_HOST}/images/${product?.image}`} alt="product image" style={{ maxWidth: "355px", borderRadius: "4px" }} />
        <div className="d-flex justify-content-start mt-4">
          <button type="button" className="btn btn-primary rounded-1 me-2 d-flex align-items-center" onClick={handleButtonClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill me-1" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            {isItemInCart ? "Go to cart" : "Add to cart"}
          </button>
        </div>
      </div>
      {!isError ? <div className="col-6 d-flex flex-column">
        <h3 className="heading">{product?.name}</h3>
        <p className="fs-5">{product?.description}</p>
        <p>Quantity: <span className="fw-medium">{product?.quantity}</span></p>
        <p>Price: <strong>${product?.unit_price}</strong></p>
        <p><span className="badge bg-success">4.6 ★</span><span className="text-secondary ms-1" style={{ fontSize: "14px" }}> 1473 Ratings & 226 Reviews</span></p>
      </div> :
        <div className="container">
          No data to display.
        </div>
      }
    </div>
  )
}

export default ProductDetails