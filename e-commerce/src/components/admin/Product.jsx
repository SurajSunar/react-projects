import { Button, Card, Image, Tag } from "antd";
import { Car, Edit2, Trash2 } from "lucide-react";
import React from "react";

const Product = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 ">
        <Button className="float-right font-bold!">Add Product</Button>
      </div>

      {Array(12)
        .fill(0)
        .map((_, index) => {
          return (
            <Card
              className="rounded!"
              cover={
                <Image
                  className="h-50! object-cover! rounded-t!"
                  src="https://picsum.photos/200/300"
                ></Image>
              }
              actions={[
                <Edit2 className="w-4 text-rose-400" />,
                <Trash2 className="w-4 text-rose-400" />,
              ]}
            >
              <Card.Meta
                title={"Hard Drive 5"}
                description={
                  <div className="space-y-2!">
                    <p>$1200.00</p>
                    <Tag className="bg-gray-200!">wewewe</Tag>
                  </div>
                }
              ></Card.Meta>
            </Card>
          );
        })}
    </div>
  );
};

export default Product;
