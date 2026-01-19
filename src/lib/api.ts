import { Product } from '@/types';

const BASE_URL = 'https://dummyjson.com';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API errors
async function handleApiResponse<T>(response: Response, errorMessage: string): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new ApiError(
      `${errorMessage}: ${errorText || response.statusText}`,
      response.status,
      response.statusText
    );
  }
  
  try {
    return await response.json();
  } catch (error) {
    throw new ApiError(`${errorMessage}: Invalid JSON response`, response.status);
  }
}

export async function getProducts(limit = 20, skip = 0): Promise<{ products: Product[]; total: number }> {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    return handleApiResponse<{ products: Product[]; total: number }>(
      res,
      `Failed to fetch products (limit: ${limit}, skip: ${skip})`
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error while fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    return handleApiResponse<Product>(res, `Failed to fetch product with id: ${id}`);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error while fetching product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function searchProducts(query: string): Promise<{ products: Product[]; total: number }> {
  try {
    const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 3600 },
    });

    return handleApiResponse<{ products: Product[]; total: number }>(
      res,
      `Failed to search products with query: ${query}`
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error while searching products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getProductsByCategory(category: string, limit = 4): Promise<{ products: Product[]; total: number }> {
  try {
    const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}`, {
      next: { revalidate: 3600 },
    });

    return handleApiResponse<{ products: Product[]; total: number }>(
      res,
      `Failed to fetch products for category: ${category}`
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error while fetching category products: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
