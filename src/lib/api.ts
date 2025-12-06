import { Product } from '@/types';

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(limit = 20, skip = 0): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export async function searchProducts(query: string): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`, {
     next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to search products');
  }

  return res.json();
}

export async function getProductsByCategory(category: string, limit = 4): Promise<{ products: Product[]; total: number }> {
  const res = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch category products');
  }

  return res.json();
}
