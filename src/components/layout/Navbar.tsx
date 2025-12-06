import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartSheet } from '@/components/cart/CartSheet';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          NEXT<span className="text-primary">STORE</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/admin" className="hover:text-primary transition-colors">
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <CartSheet />
          <Button variant="ghost" size="icon" aria-label="User Account">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
