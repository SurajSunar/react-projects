import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    fields: [{ name: "input1", value: "" }],
  });

  const addMoreField = () => {
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: `input${Date.now()}`, value: "" }],
    }));
  };

  const handleInputChange = (e, index) => {
    (form.fields[index].value = e.target.value);
    setForm((prev) => ({ ...prev, fields: [...form.fields] }));
  };

  return (
    <div className="bg-gray-50 h-screen">
      <div className="w-1/3 bg-gray-100 p-4 flex justify-center mx-auto flex-col gap-y-4">
        {form.fields.map((input, index) => (
          <div key={input.name}>
            {index + 1}.
            <input
              type="text"
              className="w-[90%] px-4 py-2 rounded-lg border border-gray-200 bg-white"
              name={input.name}
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
            ></input>
          </div>
        ))}
        <div>
          <button
            className="bg-blue-800 text-white rounded-lg px-4 py-2"
            onClick={addMoreField}
          >
            Add More
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
