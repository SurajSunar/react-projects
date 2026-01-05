import axios from "axios";
import { Axis3D, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import { Table } from "antd";
import e from "cors";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const Customer = () => {
  const { user } = useAuth();

  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(false);

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
      try {
        setLoading(true);
        const customers = await axios.get("/users", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        });

        setCustomers(customers.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="w-full bg-white p-2 rounded">
        <h1 className="text-xl text-gray-500">Customer List</h1>
      </div>
      <Table dataSource={customers} columns={columns} />
    </div>
  );
};

export default Customer;
