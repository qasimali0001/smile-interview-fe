import { useEffect, useState } from "react";
import { Table, Typography, notification, Space } from "antd";

import { deleteCustomer, viewAllCustomers } from "../../api/CustomerAPI";
import UpdateCustomer from "./UpdateCustomer";
const { Title } = Typography;

const ViewAllCustomers = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [api, contextHolder] = notification.useNotification();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => <div>{record.addresses.length}</div>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <Space>
          <a onClick={() => onUpdateClick(record)}>Update</a>
          <a onClick={() => onDeleteClick(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const onUpdateClick = async ({ id }) => {
    console.log(id);
    setCustomerId(id);
    setModalOpen(true);
  };

  const onDeleteClick = async ({ id }) => {
    try {
      const apiResponse = await deleteCustomer(id);
      api.success({
        message: "Success",
        description: apiResponse.message,
      });
    } catch (error) {
      console.log("error", error);
      api.error({
        message: "Error",
        description: error.data.message,
      });
    } finally {
      findAllCustomers();
    }
  };

  const findAllCustomers = async () => {
    setLoading(true);
    const apiResponse = await viewAllCustomers();
    if (apiResponse?.data?.length) {
      const customerMapData = apiResponse.data.map((customer) => {
        return {
          ...customer,
          key: customer.id,
        };
      });

      setCustomers(customerMapData);
      setLoading(false);
    }
  };

  useEffect(() => {
    findAllCustomers();
  }, []);
  return (
    <div>
      {contextHolder}
      <div>
        <Title level={2}>View All Customer</Title>
      </div>
      <Table
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record?.addresses?.map((address, index) => {
                return (
                  <div key={index}>
                    <strong> Address no {index + 1}</strong>
                    <div>Street : {address.street}</div>
                    <div>City : {address.city}</div>
                    <div>Country : {address.country}</div>
                  </div>
                );
              })}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={customers}
      />

      {customerId && (
        <UpdateCustomer
          customerId={customerId}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          findAllCustomers={findAllCustomers}
        />
      )}
    </div>
  );
};

export default ViewAllCustomers;
