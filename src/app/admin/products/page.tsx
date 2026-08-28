import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { AdminProductManager } from "@/components/AdminProductManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Products CRUD | RK STEEL CO",
};

export default async function AdminProductsPage() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <AdminProductManager initialProducts={serializedProducts} />;
}
