import { connectToDatabase } from "@/lib/db";
import { Catalogue } from "@/models/Catalogue";
import { AdminCatalogueManager } from "@/components/AdminCatalogueManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Catalogues & Brochures | RK STEEL CO Admin",
};

export default async function AdminCataloguesPage() {
  await connectToDatabase();
  const rawCatalogues = await Catalogue.find()
    .sort({ isMaster: -1, order: 1, createdAt: -1 })
    .lean();

  const catalogues = rawCatalogues.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString() || new Date().toISOString(),
  }));

  return <AdminCatalogueManager initialCatalogues={catalogues} />;
}
