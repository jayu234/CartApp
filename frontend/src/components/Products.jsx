import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getAllProducts } from "../store/productSlice";
import { getCartItems } from "../store/cartSlice";

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, data, success, isError, message} = useSelector((state)=>state.product.allProducts);

  useEffect(()=>{
    dispatch(getAllProducts());
    dispatch(getCartItems());
  },[dispatch])

  useEffect(()=>{
    if(success){
      setProducts(data);
    }
    if(isError){
      setProducts([]);
    }
  },[isLoading])
  return (
    <div className='container my-3'>
      <div className="d-flex justify-content-between my-3">
        <h2>All Products</h2>
        <button type="button" className="btn btn-primary" onClick={()=>{navigate("/product/create")}}>+ Create Product</button>
      </div>
      <div className="container">
        <div className="row">
          {products.length > 0 ? products.map((item, idx) => {
            return <div className="col-md-4 my-3" key={idx}>
              <ProductItem id={item._id} name={item.name} description={item.description} image={item.image} quantity={item.quantity} unit_price={item.unit_price} />
            </div>
          }): <div className="text-center fs-6 mt-5">No data to display.</div> }
        </div>
      </div>
    </div>
  )
}

export default Products