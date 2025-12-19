import { useState } from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [loginForm, setLoginForm] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setLoginForm((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (loginForm.name && loginForm.password) {
      console.log(loginForm);
    }
  };

  return (
    <div className="bg-rose-50 h-screen flex justify-center items-center">
      <div className="w-1/2  bg-white grid grid-cols-2 h-1/2 rounded-xl">
        <img src="/login.jpg" className="h-full object-cover rounded-l-xl" />
        <div className="p-4">
          <form className="space-y-4" onSubmit={onSubmit}>
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                name="name"
                type="text"
                placeholder="example@test.com"
                className="rounded-lg border border-gray-300 p-2"
                onChange={handleChange}
              />
              {submitted && !loginForm.name && (
                <small className="text-xs text-red-500">
                  The field is required
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
                onChange={handleChange}
              />
              {submitted && !loginForm.password && (
                <small className="text-xs text-red-500">
                  The field is required
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
