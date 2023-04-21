import http from "../http-util";
import IOrder from "../types/Order";

const create = (data: IOrder) => {
  return http.post<IOrder>("/orders", data);
};

const OrderService = {
  create,
};

export default OrderService;
