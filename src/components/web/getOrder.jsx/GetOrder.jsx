import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../usercart/UserCart.css'

export default function GetOrder() {
    const [getorder, setgetorder] = useState([]);

    const getUserOrder = async () => {
        try {
            const token = localStorage.getItem("userToken");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
                headers: { Authorization: `Tariq__${token}` }
            });
            setgetorder(response.data.orders);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        }
    };

    useEffect(() => {
        getUserOrder();
    }, []); 
    return (
        <div  >
              {getorder.length > 0 ? (
                getorder.map((order) => (
                    <div className="item" key={order._id} >
                        <h1>Order</h1>
                    <div className="subtotal">Order Final Price: ${order.finalPrice}
                    </div>
                    <div>status: {order.status}</div>
                    <div>address: {order.address}</div>
                    <div>created At: {order.createdAt}</div>
                    <div>payment Type: {order.paymentType} </div>
                    <div>phone Number: {order.phoneNumber} </div>
                  </div>
                ))
            ) : (
                "No orders"
            )}
        </div>
    );
}

