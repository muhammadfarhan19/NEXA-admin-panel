import { config } from "./config";

export const APIBarang = {
  GET_ALL_BARANG: config.APIHost + "/barang",
};

export const APICustomer = {
  GET_ALL_CUSTOMERS: config.APIHost + "/customers",
  POST_CUSTOMER: config.APIHost + "/insert/customers",
};

export const APICounter = {
  GET_COUNTER: config.APIHost + "/counter/",
};

export const APITransactionHome = {
  GET_TRANSACTION_HOME: config.APIHost + "/home-transaction",
};

export const APITransactionDetail = {
  POST_TRANSACTION_DETAIL: config.APIHost + "/insert/detail-transaction",
};
