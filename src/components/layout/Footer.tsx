import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">NEXTSTORE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience the future of shopping with our premium e-commerce platform. Quality products, fast delivery.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products">All Products</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/deals">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help">Help Center</Link></li>
              <li><Link href="/returns">Returns</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NextStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
