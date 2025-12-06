import { getProduct, getProductsByCategory } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct((await params).id);

  // Fetch related products by category and filter out the current product
  const { products: categoryProducts } = await getProductsByCategory(product.category, 8);
  const relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <section>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="flex items-center justify-center bg-muted rounded-xl p-6 border">
            <Carousel className="w-full max-w-sm sm:max-w-md md:max-w-lg">
              <CarouselContent>
                {(product.images?.length ? product.images : [product.thumbnail]).map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={img}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="fill-current w-5 h-5 mr-1" />
                  <span className="font-medium text-lg">{product.rating}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <span>{product.stock} in stock</span>
                  <span className={product.availabilityStatus === 'In Stock' ? 'text-green-600 font-medium' : 'text-orange-600'}>
                    {product.availabilityStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-b py-6 space-y-4">
              <AddToCartButton product={product} />

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>{product.shippingInformation || "Fast Delivery"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{product.warrantyInformation || "Standard Warranty"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
