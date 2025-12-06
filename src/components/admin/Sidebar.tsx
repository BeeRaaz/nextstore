'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useStore";
import {
   LayoutDashboard,
   Package,
   Settings,
   LogOut,
   ShoppingBag
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
   className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
   const pathname = usePathname();
   const logout = useAuthStore((state) => state.logout);
   const router = useRouter();

   const handleLogout = () => {
      logout();
      router.push("/admin");
   };

   const routes = [
      {
         href: "/admin/dashboard",
         label: "Dashboard",
         icon: LayoutDashboard,
         active: pathname === "/admin/dashboard",
      },
      {
         href: "/admin/dashboard/products",
         label: "Products",
         icon: Package,
         active: pathname.includes("/products"),
      },
      {
         href: "/admin/dashboard/orders",
         label: "Orders",
         icon: ShoppingBag,
         active: pathname.includes("/orders"),
      },
      {
         href: "/admin/dashboard/settings",
         label: "Settings",
         icon: Settings,
         active: pathname.includes("/settings"),
      },
   ];

   return (
      <aside className={cn("flex flex-col h-full border-r bg-muted/40", className)}>
         <div className="h-14 flex items-center border-b px-6">
            <Link href="/admin/dashboard" className="font-bold text-lg">
               Admin Panel
            </Link>
         </div>
         <div className="flex-1 py-4">
            <nav className="grid items-start px-4 text-sm font-medium">
               {routes.map((route) => (
                  <Link
                     key={route.href}
                     href={route.href}
                     className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        route.active ? "bg-muted text-primary" : "text-muted-foreground"
                     )}
                  >
                     <route.icon className="h-4 w-4" />
                     {route.label}
                  </Link>
               ))}
            </nav>
         </div>
         <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
               <LogOut className="h-4 w-4" />
               Logout
            </Button>
         </div>
      </aside>
   );
}
