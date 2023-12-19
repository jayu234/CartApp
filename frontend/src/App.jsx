import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateProduct from "./components/CreateProduct"
import Products from "./components/Products"
import Cart from "./components/Cart"
import ProductDetails from "./components/ProductDetails"
import Header from "./components/Header"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Spinner from "./components/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadUser } from "./store/userSlice"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const { isAuthenticated, loadUser: { isLoading } } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  function _renderComponent() {
    if (isLoading) {
      return (<div className="d-flex justify-content-center align-items-center" style={{ marginTop: "8rem" }}><Spinner width={50} height={50} /></div>)
    }
    else {
      if (!isAuthenticated) {
        return <Login />
      }
      else {
        return <Products />
      }
    }
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={_renderComponent()} />
        <Route path="/product/create" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
