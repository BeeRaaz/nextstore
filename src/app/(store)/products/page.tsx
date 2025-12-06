import { getProducts, searchProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = (await searchParams).q || "";
  const page = Number((await searchParams).page) || 1;
  const limit = 16;
  const skip = (page - 1) * limit;

  let products;
  let total;

  if (query) {
    const data = await searchProducts(query);
    products = data.products;
    total = data.total;
  } else {
    const data = await getProducts(limit, skip);
    products = data.products;
    total = data.total;
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <section>

      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            Showing {products.length} of {total} products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && !query && (
          <div className="flex justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              asChild={page > 1}
            >
              {page > 1 ? (
                <Link href={`/products?page=${page - 1}`}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <span><ChevronLeft className="h-4 w-4" /></span>
              )}
            </Button>

            <div className="flex items-center px-4 font-medium">
              Page {page} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              asChild={page < totalPages}
            >
              {page < totalPages ? (
                <Link href={`/products?page=${page + 1}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span><ChevronRight className="h-4 w-4" /></span>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
