import { Avatar, Dropdown } from "antd";
import {
  AlignRight,
  DatabaseIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogOutIcon,
  Settings2,
  Settings2Icon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  User2Icon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <Settings2Icon className="w-4 h-4" />,
  },
  {
    label: "Logout",
    key: "logout",
    icon: <LogOutIcon className="w-4 h-4" />,
  },
];

const menus = [
  {
    label: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    label: "Customers",
    url: "/admin/customers",
    icon: <User2Icon />,
  },
  {
    label: "Orders",
    url: "/admin/orders",
    icon: <ListOrderedIcon />,
  },
  {
    label: "Products",
    url: "/admin/products",
    icon: <ShoppingBagIcon />,
  },
  {
    label: "Settings",
    url: "/admin/settings",
    icon: <Settings2Icon />,
  },
];

const Layout = () => {
  const [slider, setSlider] = useState(true);

  return (
    <div className="bg-rose-50 min-h-screen">
      {/* {sidebar} */}
      <aside
        className={`${
          slider ? "w-60" : "w-10"
        } h-screen bg-white fixed left-0 top-0 duration-200`}
      >
        <div className="h-full flex flex-col justify-between items-center">
          <div className="flex gap-4 p-4 justify-center items-center">
            <ShoppingBasketIcon className="rounded-full border w-10 h-10 bg-amber-200" />{" "}
            ShopMart
          </div>

          <div className="flex-1 space-y-6 mt-6">
            {menus.map((menu) => (
              <>
                <Link
                  className="flex gap-2 text-gray-500 hover:text-gray-900"
                  key={menu.label}
                  to={menu.url}
                >
                  {menu.icon} {menu.label}
                </Link>
              </>
            ))}
          </div>
          <button className="m-2 w-full rounded bg-linear-to-r from-amber-700 via-amber-400 to-amber-200 text-white p-4">
            Logout
          </button>
        </div>
      </aside>
      {/* {content} */}
      <section>
        <div className={`${slider ? "ml-60" : "ml-10"} duration-200`}>
          <div className="w-full p-4 h-20 bg-white flex justify-center items-center sticky top-0 left-0">
            <div className="w-dvw flex justify-between items-center">
              <AlignRight
                onClick={() => setSlider(!slider)}
                className="cursor-pointer hover:scale-90 duration-200"
              />
              <Dropdown menu={{ items }}>
                <Avatar
                  src="https://testingbot.com/free-online-tools/random-avatar/300"
                  size={"large"}
                />
              </Dropdown>
            </div>
          </div>
          <div className="h-[2000px] p-4">Content here...</div>
        </div>
      </section>
    </div>
  );
};

export default Layout;
