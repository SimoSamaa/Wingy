interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  category: string;
  price: string;
  status: string;
}

interface InitialProductsState {
  products: Product[];
  lastFetch: number | null;
}

export type { Product, InitialProductsState };
