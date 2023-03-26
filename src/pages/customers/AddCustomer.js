import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  Space,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { addCustomer } from "../../api/CustomerAPI";
import { useState } from "react";
const { Title } = Typography;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const AddCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      if (!values.addresses) {
        api.error({
          message: "Error",
          description: "Kindly enter address",
        });
        return;
      }
      const apiResponse = await addCustomer(values);
      console.log(apiResponse);
      api.success({
        message: "Success",
        description: apiResponse.message,
      });
      setTimeout(() => {
        navigate("/customers");
      }, 1000);
    } catch (error) {
      api.error({
        message: "Error",
        description: error.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        // {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Title level={2}>Add New Customer</Title>
        </Form.Item>
        <Form.Item
          name={"firstName"}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"lastName"}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            { required: true },
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"gender"} label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>

        <Form.List name="addresses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "center",
                  }}
                  align="baseline"
                  //   direction="vertical"
                >
                  <Form.Item
                    {...restField}
                    label="Street"
                    name={[name, "street"]}
                    rules={[{ required: true, message: "Missing Street" }]}
                  >
                    <Input placeholder="Street" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="City"
                    name={[name, "city"]}
                    rules={[{ required: true, message: "Missing City" }]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Country"
                    name={[name, "country"]}
                    rules={[{ required: true, message: "Missing Country" }]}
                  >
                    <Input placeholder="Country" />
                  </Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => remove(name)}
                    block
                    icon={<MinusCircleOutlined />}
                  >
                    Remove
                  </Button>
                  {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                </Space>
              ))}
              <Form.Item style={{ justifyContent: "center" }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Address
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCustomer;
