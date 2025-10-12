import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    fields: [{ name: "input1", value: "" }],
  });
  const [submitted, setSubmitted] = useState(false);

  const addMoreField = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, { name: `input${Date.now()}`, value: "" }],
    }));
  };

  const handleInputChange = (e, index) => {
    e.preventDefault();
    form.fields[index].value = e.target.value;
    setForm((prev) => ({ ...prev, fields: [...form.fields] }));
  };

  const removeField = (name) => {
    form.fields = form.fields.filter((field) => field.name !== name);
    setForm((prev) => ({ ...prev, fields: [...form.fields] }));
  };

  const validate = () => form.fields.every((field) => field.value);

  const submitForm = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      console.log(form.fields);
      //do any api call here...
    }
  };

  return (
    <div className="bg-gray-50 h-screen">
      <div className="w-1/3 bg-gray-100 p-4 flex justify-center mx-auto flex-col">
        <h1 className="text-2xl font-semibold mb-2">Input Form</h1>
        <form className="flex flex-col gap-y-4" onSubmit={submitForm}>
          {form.fields.map((input, index) => (
            <div key={input.name} className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 w-full items-center">
                {index + 1}.
                <input
                  type="text"
                  className="ml-2 px-4 flex-1 py-2 rounded-lg border border-gray-200 bg-white"
                  name={input.name}
                  value={input.value}
                  onChange={(e) => handleInputChange(e, index)}
                ></input>
                {
                  form.fields.length > 1 && <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeField(input.name)}
                />
                }
              </div>
              {submitted && !input.value && (
                <p className="text-red-500 text-sm ml-8">Input is required</p>
              )}
            </div>
          ))}
          <div className="self-end">
            <button
              className="hover:underline self-end cursor-pointer"
              onClick={(e) => addMoreField(e)}
            >
              Add More
            </button>
          </div>
          <div className="">
            <button
              className="bg-blue-800 text-white rounded-lg  px-4 py-2 self-end cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
