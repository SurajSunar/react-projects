import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .test(
      "is-gmail",
      () => `Only gmail is allowed`,
      (value) => value.includes("gmail")
    ),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(/[A-Z]/, "At lease one upper case character")
    .matches(/[a-z]/, "At lease one lower case character")
    .matches(/[\d]/, "At lease one number character")
    .matches(/[^A-Za-z0-9]/, "At lease one special character"),
});

const AdminLogin = () => {
  const login = (state) => {
    console.log(state);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: login,
  });

  return (
    <div className="bg-rose-50 h-screen flex justify-center items-center animate__animated animate__fadeIn animate__slower">
      <div className="w-1/2  bg-white grid grid-cols-2 h-1/2 rounded-xl animate__animated animate__slideInUp animate__faster">
        <img src="/login.jpg" className="h-full object-cover rounded-l-xl" />
        <div className="p-4">
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                name="email"
                type="text"
                placeholder="example@test.com"
                className="rounded-lg border border-gray-300 p-2"
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <small className="text-xs text-red-500">
                  {formik.errors.email}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="************"
                className="rounded-lg border border-gray-300 p-2"
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <small className="text-xs text-red-500">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <button
              type="submit"
              className="rounded-lg w-full p-2 bg-green-500 text-white cursor-pointer"
            >
              Login
            </button>

            <div className="flex flex-col  text-green-500">
              <Link to={"#"} className="hover:underline">
                Forgot Password?
              </Link>
              <Link to={"#"} className="hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
