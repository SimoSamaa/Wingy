interface Order {
  id: string;
  orderId: string;
  date: string;
  fullName: string;
  totalPrice: string;
  paymentMethod: string;
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

export default Order;
