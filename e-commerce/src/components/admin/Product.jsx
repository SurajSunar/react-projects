import { Button, Card, Image, Popconfirm, Tag } from "antd";
import axios from "axios";
import { Car, Edit2, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../zustand/useAuth";
import AddProduct from "./AddProduct";
import { useProduct } from "../../zustand/useProduct";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/httprequest";

const Product = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [modalOpen, setModalOpen] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const { deleteProduct } = useProduct();

  const fetchProducts = async () => {
    try {
      const customers = await httpRequest.get("/products");

      setProducts(customers.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const confirm = async (id) => {
    await deleteProduct(id, user);
    await fetchProducts();
    toast.success("Product deleted successfully");
  };

  const cancel = (e) => {
    console.log(e);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <div class="hover:border-run p-1 float-right border border-gray-200 rounded-lg w-fit bg-white">
          <Button
            className="border-0!"
            onClick={() => {
              setSelectedProduct();
              setModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
      </div>

      {products.map((product, index) => {
        return (
          <Card
            className="rounded!"
            cover={
              <Image
                className="h-50! object-cover! rounded-t!"
                src={product.image_url}
                fallback="https://placehold.net/400x400.png"
              ></Image>
            }
            actions={[
              <Edit2
                className="w-4 text-rose-400"
                onClick={() => editProduct(product)}
              />,
              <Popconfirm
                title="Delete the customer"
                description="Are you sure to delete this customer?"
                onConfirm={() => confirm(product.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Trash2 className="w-4 text-red-500 cursor-pointer" />
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              title={product.name}
              description={
                <div className="space-y-2!">
                  <p>${product.price}</p>
                  <div className="">
                    {product.tags.map((tag) => (
                      <Tag className="bg-gray-200! mr-2!">{tag}</Tag>
                    ))}
                  </div>
                </div>
              }
            ></Card.Meta>
          </Card>
        );
      })}

      <AddProduct
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        fetchProducts={fetchProducts}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default Product;
