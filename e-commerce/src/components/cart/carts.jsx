import React, { useEffect, useState } from "react";

const Carts = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts([]);
  }, [products]);

  return <div>Carts</div>;
};

export default Carts;
