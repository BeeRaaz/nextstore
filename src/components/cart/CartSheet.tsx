'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export function CartSheet() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const total = mounted ? getCartTotal() : 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Shopping Cart">
          <ShoppingCart className="h-5 w-5" />
          {mounted && itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        
        {mounted && items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="grid gap-1">
                        <Link href={`/products/${item.id}`} className="font-medium hover:underline line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.brand}
                        </p>
                        <p className="text-sm font-medium">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                         </div>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                         >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                         </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
                <Separator />
                <SheetFooter className="space-y-4">
                <div className="flex items-center justify-between font-medium">
                   <span>Total</span>
                   <span>${total.toFixed(2)}</span>
                </div>
                   <SheetClose asChild>
                      <Button className="w-full" size="lg">Checkout</Button>
                   </SheetClose>
                </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">Your cart is empty</div>
            <SheetClose asChild>
              <Button variant="secondary">Continue Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
