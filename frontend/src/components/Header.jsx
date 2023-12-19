import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/userSlice";
const Header = () => {
    const { user } = useSelector((state) => state.user.loadUser);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(userLogout());
        history.replaceState(null, null, "/");
    }
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>CartApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isAuthenticated && <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active" aria-current="page">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"#"} className="nav-link" >Categories</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn">
                            <Link to={"/cart"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </Link>
                        </button>
                    </div>
                    <div className="d-flex dropdown" >
                        <button type="button" className="btn d-flex border rounded-4 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><button className="dropdown-item" type="button">{user?.firstName}</button></li>
                            <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                </div>}
            </div>
        </nav >
    );
};

export default Header;
