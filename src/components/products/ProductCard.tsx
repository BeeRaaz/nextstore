'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useCartStore } from '@/store/useStore';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isInCart = mounted ? items.some((item) => item.id === product.id) : false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.preventDefault();
    removeItem(product.id);
    toast.info('Removed from cart', {
      description: `${product.title} has been removed from your cart.`,
    });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-border/50 p-0">
      <Link href={`/products/${product.id}`} className="flex-1">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
        </div>

        <CardHeader className="p-4 pb-2 space-y-1">
          <div className="flex justify-between items-start gap-2">
            <Badge variant="outline" className="text-xs text-muted-foreground w-fit">
              {product.category}
            </Badge>
            <div className="flex items-center text-amber-500 text-xs font-medium">
              <Star className="w-3 h-3 fill-current mr-1" />
              {product.rating}
            </div>
          </div>
          <h3 className="font-semibold text-lg leading-tight truncate" title={product.title}>
            {product.title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5em]">
            {product.description}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold">${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        {isInCart ? (
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRemoveFromCart}
            className="transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="transition-colors"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
