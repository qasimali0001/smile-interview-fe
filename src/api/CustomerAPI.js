import axios, { handleError } from "./index";

const addCustomer = (data) => {
  return axios({
    method: "post",
    url: "api/customer",
    data,
  })
    .then((res) => {
      return res.data;
    })
    .catch(handleError);
};

const viewAllCustomers = () => {
  return axios({
    method: "get",
    url: "api/customer",
  })
    .then((res) => {
      return res.data;
    })
    .catch(handleError);
};

const viewCustomer = (id) => {
  return axios({
    method: "get",
    url: `api/customer/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch(handleError);
};

const deleteCustomer = (id) => {
  return axios({
    method: "delete",
    url: `api/customer/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch(handleError);
};

const updateCustomer = (id, data) => {
  return axios({
    method: "post",
    url: `api/customer/${id}`,
    data,
  }).then((res) => {
    return res.data;
  });
};

export {
  addCustomer,
  viewAllCustomers,
  deleteCustomer,
  viewCustomer,
  updateCustomer,
};
