import { isNaN, useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../zustand/useAuth";
import { Button, Input, Modal, Tag } from "antd";
import { useRef, useState } from "react";
import { PlusIcon } from "lucide-react";

const categories = ["Electronics", "Accessories", "Storage", "Audio"];

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(4, "Too Short!")
    .max(50, "Too Long!"),
  image_url: Yup.string().url("Invalid Image URL").required("Required"),
  price: Yup.string()
    .required("Required")
    .test(
      "is-price",
      () => `Only number is allowed`,
      (value) => {
        return !isNaN(Number(value));
      }
    ),
  category: Yup.string()
    .required("Required")
    .test(
      "is-category",
      () => `Select allowed categories only`,
      (value) => {
        return categories.includes(value);
      }
    ),
  stock: Yup.string()
    .required("Required")
    .test(
      "is-stock",
      () => `Only number is allowed`,
      (value) => {
        return !isNaN(Number(value));
      }
    ),
  tags: Yup.array()
    .required("Required")
    .test(
      "is-tag",
      () => `At least one tag is required`,
      (value) => {
        return value.length;
      }
    ),
});

const AddProduct = ({ modalOpen, setModalOpen }) => {
  const { updateUser } = useAuth();

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      image_url: "",
      price: "",
      stock: "",
      category: "",
      tags: [],
    },
    enableReinitialize: true,
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      //await addProduct(values);
      setModalOpen(false);
    },
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const tags = formik.values.tags || [];

    if (inputValue && !tags.includes(inputValue)) {
      formik.setFieldValue("tags", [...tags, ...[inputValue]], false);
      formik.valida;
    }
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <Modal
          title="Add Customer"
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={[
            <Button
              htmlType="submit"
              type="primary"
              disabled={!formik.isValid}
              onClick={formik.handleSubmit}
            >
              Save Changes
            </Button>,
          ]}
        >
          <div className="w-full bg-white grid grid-cols-1 h-fit rounded-xl animate__animated">
            <div className="p-4">
              <div className="flex flex-col gap-2">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Hard Disk 500GB"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && (
                  <small className="text-xs text-red-500 mb-2">
                    {formik.errors.name}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Image URL</label>
                <input
                  name="image_url"
                  type="text"
                  placeholder="https://example.com"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.image_url}
                />
                {formik.errors.image_url && (
                  <small className="text-xs text-red-500  mb-2">
                    {formik.errors.image_url}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Price</label>
                <input
                  name="price"
                  type="text"
                  placeholder="100"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.errors.price && (
                  <small className="text-xs text-red-500  mb-2">
                    {formik.errors.price}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Stock</label>
                <input
                  name="stock"
                  type="text"
                  placeholder="100"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                />
                {formik.errors.stock && (
                  <small className="text-xs text-red-500  mb-2">
                    {formik.errors.stock}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Category</label>
                <select
                  name="category"
                  className="rounded-lg border border-gray-300 p-2"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value={""}>{""}</option>
                  {categories.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
                {formik.errors.category && (
                  <small className="text-xs text-red-500  mb-2">
                    {formik.errors.category}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Tag</label>
                <div className="flex gap-2">
                  {formik.values?.tags?.map((tag) => (
                    <Tag
                      className="w-fit!"
                      key={tag}
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>

                {inputVisible ? (
                  <Input
                    type="text"
                    size="middle"
                    style={{ width: 100 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={(e) => handleInputConfirm(e)}
                    onPressEnter={(e) => handleInputConfirm(e)}
                  />
                ) : (
                  <Tag
                    className="flex! w-fit! gap-2! items-center! cursor-pointer"
                    onClick={() => setInputVisible(true)}
                  >
                    <PlusIcon className="w-4" /> New Tag
                  </Tag>
                )}

                {formik.errors.tags && (
                  <small className="text-xs text-red-500">
                    {formik.errors.tags}
                  </small>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default AddProduct;
