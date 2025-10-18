import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <nav className="w-1/4">
        <ul className="[&_li]:p-2 [&_li]:bg-gray-200 [&_li]:hover:bg-gray-100 [&_a]:w-full">
          <li>
            <Link href={"/dashboard"}>Home</Link>
          </li>
          <li>
            <Link href={"/dashboard/orders"}>Order</Link>
          </li>
          <li>
            <Link href={"/dashboard/widget"}>Widget</Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 justify-items-center self-center">{children}</div>
    </div>
  );
};

export default DashboardLayout;
