import { Product, ProductFilters, ProductListResponse, CategoryInfo } from '@/types/product';

const API_BASE = '/api';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    const params = new URLSearchParams();
    if (filters?.category) params.set('category', filters.category);
    if (filters?.minPrice) params.set('minPrice', String(filters.minPrice));
    if (filters?.maxPrice) params.set('maxPrice', String(filters.maxPrice));
    if (filters?.sortBy) params.set('sortBy', filters.sortBy);
    if (filters?.search) params.set('search', filters.search);
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.limit) params.set('limit', String(filters.limit));

    const res = await fetch(`${API_BASE}/products?${params}`);
    if (!res.ok) throw new Error('Impossible de charger les produits');
    return res.json();
  },

  async getProduct(idOrSlug: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    if (!res.ok) throw new Error('Produit introuvable');
    return res.json();
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products?featured=true&limit=8`);
    if (!res.ok) throw new Error('Impossible de charger les produits vedettes');
    const data: ProductListResponse = await res.json();
    return data.products;
  },

  async getCategories(): Promise<CategoryInfo[]> {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Impossible de charger les catégories');
    return res.json();
  },

  async searchProducts(query: string): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products?search=${encodeURIComponent(query)}&limit=10`);
    if (!res.ok) return [];
    const data: ProductListResponse = await res.json();
    return data.products;
  },
};
