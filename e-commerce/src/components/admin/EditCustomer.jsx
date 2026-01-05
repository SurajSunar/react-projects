import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../zustand/useAuth";
import { Button, Modal } from "antd";

const EditUserSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Required")
    .min(4, "Too Short!")
    .max(50, "Too Long!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .test(
      "is-gmail",
      () => `Only gmail is allowed`,
      (value) => value.includes("gmail")
    ),
  role: Yup.string()
    .required("Required")
    .test(
      "is-role",
      () => `Only Admin or User role is allowed`,
      (value) => {
        console.log(value);

        return ["admin", "user"].includes(value);
      }
    ),
});

const EditUser = ({ user, modalOpen, setModalOpen, fetchCustomers }) => {
  const { updateUser } = useAuth();

  const formik = useFormik({
    initialValues: user || {},
    enableReinitialize: true,
    validationSchema: EditUserSchema,
    onSubmit: async (values) => {
      await updateUser(values);
      setModalOpen(false);
      await fetchCustomers();
    },
  });

  return (
    <div>
      <Modal
        title="Edit Customer"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
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
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2">
                <label>Full name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="John M"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname && (
                  <small className="text-xs text-red-500">
                    {formik.errors.fullname}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="example@test.com"
                  className="rounded-lg border border-gray-300 p-2"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <small className="text-xs text-red-500">
                    {formik.errors.email}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label>Role</label>
                <select
                  name="role"
                  className="rounded-lg border border-gray-300 p-2"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <option value={"admin"}>Admin</option>
                  <option value={"user"}>User</option>
                </select>
                {formik.errors.role && (
                  <small className="text-xs text-red-500">
                    {formik.errors.role}
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditUser;
