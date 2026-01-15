import { Axis3D, Edit2, Loader2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import { Popconfirm, Table } from "antd";
import EditUser from "./EditCustomer";
import { httpRequest } from "../../lib/httprequest";

const Customer = () => {
  const { user, deleteUser } = useAuth();

  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [modalOpen, setModalOpen] = useState(false);

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
    {
      title: "Action",
      key: "role",
      render: (item) => {
        return (
          <div className="flex gap-2">
            <Edit2
              className="w-4 cursor-pointer"
              onClick={() => editCustomer(item)}
            />

            <Popconfirm
              title="Delete the customer"
              description="Are you sure to delete this customer?"
              onConfirm={() => confirm(item.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Trash2 className="w-4 text-red-500 cursor-pointer" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const confirm = async (id) => {
    await deleteUser(id);
    await fetchCustomers();
  };

  const cancel = (e) => {
    console.log(e);
  };

  const editCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const customers = await httpRequest.get("/users", {
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

  useEffect(() => {
    !!user && fetchCustomers();
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
      <Table dataSource={customers} columns={columns} />
      <EditUser
        user={selectedCustomer}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        fetchCustomers={fetchCustomers}
      />
    </div>
  );
};

export default Customer;
