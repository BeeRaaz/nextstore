"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useStore";
import { Product } from "@/types";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export function AddToCartButton({ product }: { product: Product }) {
  const { items, addItem, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isInCart = mounted ? items.some((item) => item.id === product.id) : false;

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart.`
    });
  };

  const handleRemoveFromCart = () => {
    removeItem(product.id);
    toast.info('Removed from cart', {
      description: `${product.title} has been removed from your cart.`
    });
  };

  if (isInCart) {
    return (
      <Button size="lg" variant="destructive" className="w-full md:w-auto text-lg px-8" onClick={handleRemoveFromCart}>
        <Trash2 className="mr-2 h-5 w-5" />
        Remove from Cart
      </Button>
    );
  }

  return (
    <Button size="lg" className="w-full md:w-auto text-lg px-8" onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
