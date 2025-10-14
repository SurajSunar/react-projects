import { Button, Card, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState()
  const [error, setError] = useState()

  const submitForm = async() => {
    console.log(form.getFieldValue())

    try {
        const response = await axios.request({
           method: form.method,
           url: form.url
        })
        setResult(JSON.stringify(response.data, null, 2))

    } catch (error) {
      setError(error.status || 500)
      toast.error('Network Issue', error)
    }

  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-1/2 mx-auto p-4">
        <Card className="p-2">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Http API Testing</h1>
            <p className="text-gray-500">
              Access response from valid any Rest API
            </p>
            <Form onFinish={submitForm} form={form}>
              <Form.Item
                name="method"
                rules={[
                  { required: true, message: "Please input your method!" },
                ]}
              >
                <Select>
                  <Select.Option key={"GET"}>GET</Select.Option>
                  <Select.Option key={"POST"}>POST</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="url"
                rules={[{ required: true, message: "Please input your URL!" }]}
              >
                <Input></Input>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;
