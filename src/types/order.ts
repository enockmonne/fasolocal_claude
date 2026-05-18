import { Address } from './user';
import { CartItem } from './cart';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: 'XOF';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export type PaymentMethod =
  | 'orange-money'
  | 'moov-money'
  | 'coris-money'
  | 'visa'
  | 'mastercard'
  | 'cash-on-delivery';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface CheckoutData {
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
}
