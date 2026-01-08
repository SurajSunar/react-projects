import React, { useEffect } from "react";
import { useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const loadOrders = async () => {
      setOrders([]);
    };

    loadOrders();
  }, []);

  return <div>{orders}</div>;
};

export default Order;
