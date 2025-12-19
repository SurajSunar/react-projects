import "./App.css";
import "animate.css";
import "@ant-design/v5-patch-for-react-19";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route path="login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
