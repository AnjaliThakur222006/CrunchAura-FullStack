export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  flavor: string;
  description: string;
  price: number;
  packSize: string;
  image: string;
  badge?: string;
  inStock: boolean;
  ingredients: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: 'B2C' | 'B2B' | 'ADMIN';
  favorite_flavor: string;
  points: number;
}

export interface RegistrationPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  user_type: 'B2C' | 'B2B';
  favorite_flavor: string;
  marketing_consent: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  subtotal: number;
  discount: number;
  promo_code: string;
  total: number;
  status: string;
  created_at: string;
  items: { product_name: string; quantity: number; price: number }[];
}

export interface Feedback {
  id: number;
  product: number | null;
  product_name?: string;
  rating: number;
  comment: string;
  created_at: string;
}
