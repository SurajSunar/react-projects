import { AlignRight } from "lucide-react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [slider, setSlider] = useState(true);

  return (
    <div className="bg-rose-50 min-h-screen">
      {/* {sidebar} */}
      <aside>
        <div
          className={`${
            slider ? "w-60" : "w-10"
          } h-screen bg-white fixed left-0 top-0 duration-200`}
        ></div>
      </aside>
      {/* {content} */}
      <section>
        <div
          className={`${slider ? "ml-60" : "ml-10"} w-full top-0 duration-200`}
        >
          <div className="h-20 bg-white flex items-center sticky top-0 border-b border-gray-100">
            <AlignRight
              onClick={() => setSlider(!slider)}
              className="cursor-pointer hover:scale-90 duration-200"
            />
          </div>
          <div className="h-[2000px] p-4">Content here...</div>
        </div>
      </section>
    </div>
  );
};

export default Layout;
