import React from "react";

const getCustomers = async () => {
  const result = await fetch("http://localhost:3000/api/customers");

  return await result.json();
};

const Customers = async () => {
  const customers = await getCustomers();

  return (
    <div className="grid grid-cols-5 gap-4 m-6">
      {customers.map((customer: any, index) => (
        <div key={customer.id} className="bg-gray-200 p-4">
          {index + 1}. {customer.name}
          <p>{customer.email}</p>
           <p>{customer.city}</p>
        </div>
      ))}
    </div>
  );
};

export default Customers;
