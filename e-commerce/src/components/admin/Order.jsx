import React, { useEffect } from "react";
import { useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      setOrders([]);
    };

    loadOrders();
  }, []);

  if (!orders.length) return <>Loading...</>;

  return (
    <div>
      {orders &&
        orders.map((order, index) => (
          <>
            {index + 1}. {order.products} - Nu.{order.cost}
          </>
        ))}
    </div>
  );
};

export default Order;
