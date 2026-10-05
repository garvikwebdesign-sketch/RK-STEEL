import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { AdminPriceListManager } from "@/components/AdminPriceListManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Price Lists & Rate Cards | RK STEEL CO Admin",
};

export default async function AdminPriceListsPage() {
  await connectToDatabase();
  const rawLists = await PriceList.find().sort({ createdAt: -1 }).lean();

  const priceLists = rawLists.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
  }));

  return <AdminPriceListManager initialPriceLists={priceLists} />;
}
