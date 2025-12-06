# NextStore - E-commerce Frontend

A modern, responsive e-commerce application built with **Next.js 15**, **Tailwind CSS**, and **Shadcn UI**. This project features a public storefront for customers and a secured admin dashboard for management.

## 🚀 Features

### 🛍️ Storefront
- **Dynamic Product Listing**: Browse products with pagination.
- **Product Details**: 
  - Image Carousel for product visualization.
  - Detailed specs including warranty, shipping info, and stock status.
  - "Related Products" suggestions based on the current product's category.
- **Shopping Cart**:
  - Global state management using **Zustand**.
  - Persisted cart state (LocalStorage) so you never lose your items.
  - Add/Remove toggle buttons with toast notifications for feedback.

### 🛡️ Admin Dashboard
- **Secure Access**: Dedicated login page (Mock Authentication).
- **Dashboard Overview**: Visual summary of key metrics (Revenue, Users, Sales) - HardCoded.
- **Product Management**: Data table to view and manage inventory.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: Native Fetch API with Caching
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **API**: [DummyJSON](https://dummyjson.com/) (for mock data)

## 🔑 Admin Credentials

To access the admin dashboard at `/admin`, use the following hardcoded credentials:

- **Email**: `admin@example.com`
- **Password**: `admin123`