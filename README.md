# Dinedesk (Ekodine)

Dinedesk is a robust restaurant management and POS (Point of Sale) system built to help restaurants manage their menus, orders, reservations, tables, and staff efficiently. It offers tailored solutions with plans like Free, Pro, and Enterprise, supporting multi-tenant features for different restaurants under a single digital roof.

## Features

- **Multi-Tenant SaaS Architecture:** Manage multiple restaurants on one platform.
- **Roles and Permissions:** Comprehensive role-based access control (Owner, Manager, Staff, Customer).
- **Menu Management:** Create and organize menu items with categories and dynamic pricing.
- **Order Tracking:** Real-time order status tracking (Pending, Preparing, Ready, Delivered, Cancelled).
- **Reservations & Table Booking:** Allow customers to reserve tables seamlessly.
- **Subscription Plans:** Free, Pro, and Enterprise tiers (via Stripe).
- **Responsive Design:** A tailored, beautiful UI built with TailwindCSS.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Directory)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v5](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Payments:** [Stripe](https://stripe.com/)
- **Real-Time Features:** [Pusher](https://pusher.com/)
- **Email:** [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Media:** [Cloudinary](https://cloudinary.com/)

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v18+)
- PostgreSQL (or use a cloud provider like Supabase/Neon)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aycozy/Ekodine.git
   cd Ekodine/dinedesk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy the `.env.example` file to `.env` and fill in your details:
   ```bash
   cp .env.example .env
   ```
   *Make sure to configure your `DATABASE_URL`, Stripe keys, Pusher credentials, Resend API key, NextAuth secret, etc.*

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app running!

## Learn More

To learn more about the tools used in this project, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## License

This project is fully proprietary.
