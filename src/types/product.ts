export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: 'XOF';
  images: ProductImage[];
  category: ProductCategory;
  subcategory?: string;
  tags: string[];
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  weight?: number;
  origin: string;
  producer?: Producer;
  ratings: { average: number; count: number };
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Producer {
  id: string;
  name: string;
  location: string;
  bio?: string;
  avatar?: string;
}

export type ProductCategory =
  | 'agroalimentaire'
  | 'cosmetiques'
  | 'artisanat'
  | 'textiles'
  | 'sante-bien-etre'
  | 'boissons'
  | 'cereales-farines'
  | 'epices-condiments';

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  origin?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular' | 'rating';
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
