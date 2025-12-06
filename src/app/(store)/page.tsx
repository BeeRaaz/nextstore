import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/products/ProductCard";

export default async function HomePage() {
  const { products } = await getProducts(10);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Elevate Your Style
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover the latest trends in fashion and electronics. Premium quality, unbeatable prices.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Products
            </h2>
            <Link href="/products" className="text-primary hover:underline underline-offset-4">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
