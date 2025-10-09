import { AlignLeft, AlignRight, NotebookIcon, PowerOffIcon, Settings, SignalZero } from "lucide-react";
import React, { useState } from "react";
import { useIsMobile } from "./hooks/useIsMobile";

const App = () => {
  const [width, setWidth] = useState(280);
  const mobileDevice = useIsMobile();

  const handleSize = () => {
    setWidth(width > 0 ? 0 : 280)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <aside className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-screen flex fixed duration-200" style={{ width: width, zIndex: width > 0 ? 1 : 0 }}>
          {width > 0 && <p className="p-4">Sidebar</p>}
        </aside>
        <div className="grow duration-200" style={{ marginLeft: mobileDevice ? 0 : width }}>
          <header className="p-4 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200 sticky top-0 left-0 flex justify-between items-center">
            <AlignLeft className=" hover:bg-orange-500 hover:scale-110 hover:duration-200 hover:cursor-pointer" onClick={handleSize}/>
            <div className="flex gap-4">
              <NotebookIcon />
              <Settings/>
              <PowerOffIcon />
              {
                mobileDevice && width > 0 &&
                <AlignRight className=" hover:bg-amber-500 cursor-pointer" onClick={handleSize}/>
              }
            </div>
          </header>
          <section className="h-[2000px]">
              <div className="p-4 space-y-4">
                <h1 className="text-2xl font-bold">Power of Book</h1>
                <p className=" border-t-2 border-t-gray-200 py-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, assumenda quibusdam tenetur asperiores temporibus impedit veniam. Ratione assumenda, qui, cum soluta eos consectetur rem exercitationem id pariatur commodi doloribus magni.</p>
              </div>

          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
