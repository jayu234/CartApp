import axios from 'axios';
import React, { useState } from 'react'
import cartService from '../apis/cartApi';
import { useDispatch } from 'react-redux';
import { removeItem } from "../store/cartSlice";

function CartItem({ p_id, image, name, description, quantity, unit_price }) {
    const [currQuantity, setCurrQuantity] = useState(quantity);
    const dispatch = useDispatch();
    const increaceQuantity = async () => {
        const res = await cartService.updateCart({ query: "add", productId: p_id })
        if (res.success) {
            setCurrQuantity((prev) => prev + 1)
        }
    }
    const decreaseQuantity = async () => {
        const res = await cartService.updateCart({ query: "remove", productId: p_id })
        if (res.success) {
            setCurrQuantity((prev) => prev - 1)
        }
    }
    return (
        <div className='row row-cols-5 d-flex justify-content-between align-items-center'>
            <div className='col-1' >
                <img src={`${import.meta.env.VITE_BACKEND_HOST}/images/${image}`} className="col rounded-1" alt="..." style={{ width: "50px", height: '50px' }} />
            </div>
            <div className='col-5 d-flex mt-2 flex-column justify-content-center'>
                <p className='lh-1'><strong>{name}</strong></p>
                <p className='lh-1 text-secondary'>{description}</p>
            </div>
            <div className='col-3' >
                <button type='button' className='btn me-1 btn-primary rounded-start rounded-end-0' disabled={currQuantity <= 1} onClick={decreaseQuantity} >-</button>
                <button type='button' className='btn me-1 border rounded-0'>{currQuantity}</button>
                <button type='button' className='btn me-1 btn-primary rounded-end rounded-start-0' onClick={increaceQuantity}>+</button>
            </div>
            <p className='col-1' ><strong>${unit_price}</strong></p>
            <button type='button' className='col-1 btn' onClick={() => { dispatch(removeItem(p_id)) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </button>
        </div>
    )
}

export default CartItem