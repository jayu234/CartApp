import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductItem({ id, name, description, image, unit_price }) {
    const navigate = useNavigate();
    return (
        <div className="card">
            <img src={`${import.meta.env.VITE_BACKEND_HOST}/images/${image}`} className="card-img-top" alt="..." style={{ height: '270px' }} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}{name.length > 25 ? '...' : ''}</p>
                <p><span className="badge bg-success">4.6 ★</span><span className="text-secondary ms-1" style={{ fontSize: "14px" }}> (1473)</span></p>
                <p className="card-text">
                    <span className='fw-medium'>${unit_price}</span>
                    <span className='mx-2 text-secondary' style={{fontSize: "14px"}}>
                        <strike>2912</strike>
                    </span>
                    <span className='text-success fw-medium' style={{fontSize: "14px"}}>64% Off</span>
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => { navigate(`/product/${id}`) }}>View</button>
            </div>
        </div>
    )
}

export default ProductItem