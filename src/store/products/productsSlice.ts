import { createSlice } from '@reduxjs/toolkit';
import type { Product, InitialProductsState } from '@/types/productsTypes';

const initialState: InitialProductsState = {
  products: [
    {
      id: 'c1',
      category: '🍝 Pastas',
      description: 'Delicious spaghetti with a rich marinara sauce.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-2-thumbnail.jpg',
      price: '12.99',
      name: 'Spaghetti Marinara',
      status: 'Available',
    },
    {
      id: 'c2',
      category: '🍟 Starters',
      description: 'Crispy tofu bites served with sweet chili sauce.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tofu-thumbnail.jpg',
      price: '8.99',
      name: 'Crispy Tofu Bites',
      status: 'Unavailable',
    },
    {
      id: 'c3',
      category: '🥗 Salads',
      description: 'Fresh garden salad with a variety of seasonal vegetables.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-2-thumbnail.jpg',
      price: '9.49',
      name: 'Garden Salad',
      status: 'Available',
    },
    {
      id: 'c4',
      category: '🍖 Grilled Meat',
      description: 'Grilled salmon fillet with lemon and herbs.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salmon-thumbnail.jpg',
      price: '18.99',
      name: 'Grilled Salmon',
      status: 'Available',
    },
    {
      id: 'c5',
      category: '🍝 Pastas',
      description: 'Penne pasta tossed in a creamy Alfredo sauce.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-9-thumbnail.jpg',
      price: '13.49',
      name: 'Penne Alfredo',
      status: 'Unavailable',
    },
    {
      id: 'c6',
      category: '🍩 Deserts',
      description: 'A rich chocolate cupcake topped with buttercream frosting.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cupcake-thumbnail.jpg',
      price: '4.99',
      name: 'Chocolate Cupcake',
      status: 'Available',
    },
    {
      id: 'c7',
      category: '🍔 Burgers',
      description: 'Juicy beef burger with lettuce, tomato, and cheese.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-7-thumbnail.jpg',
      price: '10.99',
      name: 'Beef Burger',
      status: 'Available',
    },
    {
      id: 'c8',
      category: '🍗 Chicken',
      description: 'Fried chicken pieces served with a side of coleslaw.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/chicken-fried-thumbnail.jpg',
      price: '11.49',
      name: 'Fried Chicken',
      status: 'Available',
    },
    {
      id: 'c9',
      category: '🍕 Pizza',
      description: 'Pepperoni pizza topped with mozzarella cheese.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepperoni-pizza-thumbnail.jpg',
      price: '14.99',
      name: 'Pepperoni Pizza',
      status: 'Available',
    },
    {
      id: 'c10',
      category: '🥤 Cold Drinks',
      description: 'Refreshing iced tea with lemon.',
      image: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tofu-thumbnail.jpg',
      price: '2.99',
      name: 'Iced Tea',
      status: 'Available',
    },
  ],
  lastFetch: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: { payload: Product[]; }) {
      state.products = action.payload;
      // state.products = state.products;
    },
    setAddProduct(state, action: { payload: Product; }) {
      state.products.unshift(action.payload);
    },
    setDeleteProduct(state, action: { payload: string; }) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    setEditProduct(state, action: { payload: Product; }) {
      state.products = state.products.map((product) => product.id === action.payload.id ? action.payload : product);
    },
    setLastFetch(state, action: { payload: number; }) {
      state.lastFetch = action.payload;
    }
  }
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
