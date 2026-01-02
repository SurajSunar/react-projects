import axios from "axios";
import { Axis3D } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import { Table } from "antd";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const Customer = () => {
  const { user } = useAuth();

  const [customers, setCustomers] = useState();

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      const customers = await axios.get("/users", {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      });

      setCustomers(customers);
    };
    fetchCustomers();
  }, [user]);

  return (
    <div>
      <Table dataSource={customers} columns={columns} />;
    </div>
  );
};

export default Customer;
