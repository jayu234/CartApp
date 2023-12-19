import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { getCartItems } from "../store/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data, success, isError } = useSelector((state) => state.cart.items);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch])

  useEffect(() => {
    if (success) {
      setCartItems(data);
    }
    if (isError) {
      setCartItems([]);
    }
  }, [isLoading, data]);
  return (
    <div className="w-50 mx-auto border rounded-3 container p-4 mt-4">
      <div className="d-flex justify-content-between">
        <h4>Shopping cart</h4>
        <p className="text-secondary">{cartItems.length > 0 ? cartItems.length : 0} items</p>
      </div>
      {success && cartItems.length > 0 ?
        <div>
          <div className="row row-cols-1 ">
            {data.map(({ product, quantity }, idx) => {
              return (
                <div key={idx} className="col shadow-sm p-3 mb-3 bg-body-tertiary rounded">
                  <CartItem p_id={product._id} name={product.name} description={product.description} quantity={quantity} unit_price={product.unit_price} image={product.image}/>
                </div>
              )
            })}
          </div>
          <div className="d-flex justify-content-between" >
            <div style={{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
              <p className="d-inline">← </p><p className="d-inline"><u>Back</u></p>
            </div>
            <button type='button' className='btn btn-success'>
              Procced to pay
            </button>
          </div>
        </div>
        :
        <div className="fs-6 text-center">
          You don't have any items in the cart.
          <div style={{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
            <p className="d-inline">← </p><p className="d-inline"><u>Back</u></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart