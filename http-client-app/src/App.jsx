import { Button, Card, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Loader2 } from "lucide-react";

const App = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const submitForm = async () => {
    const values = form.getFieldValue();

    try {
      setLoading(true);
      const response = await axios({
        method: values.method,
        url: values.url,
      });
      setResult(JSON.stringify(response.data, null, 2));
      setStatus(response.status);
    } catch (error) {
      setStatus(error.status || 500);
      toast.error("Network Issue", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-1/2 mx-auto p-4 !space-y-2">
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
                <Button type="primary" htmlType="submit" disabled={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            {status && <p className="self-end">Status: {status}</p>}
             {loading ? <Loader2 className="animate-spin"/> : <SyntaxHighlighter language="json" style={dark}>{result}</SyntaxHighlighter>}
          </div>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
