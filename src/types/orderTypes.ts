interface Order {
  id: string;
  orderId: string;
  date: string;
  fullName: string;
  totalPrice: string;
  status: string;
  details: {
    name: string;
    count: number;
    price: number;
  }[];
  address: string;
  email: string;
  phone: string;
}

interface OrdersInfo {
  totalOrders: string,
  newOrdersToday: string,
  totalRevenue: string,
  revenueSteam: string,
}

interface InitialOrdersState {
  orders: Order[];
  totalItems: number;
  ordersInfo: OrdersInfo | {};
};

export type { Order, InitialOrdersState, OrdersInfo };
