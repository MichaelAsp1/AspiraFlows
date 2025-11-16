// app/admin/clients/page.tsx
import { auth } from "../../..//lib/auth";
import { prisma } from "../../..//lib/prisma";
import ClientsTable from "./ClientsTable";

export default async function AdminClientsPage() {
  const session = await auth();

  // Only require that the user is logged in
  if (!session?.user) {
    return <div className="p-6">Not authorized</div>;
  }

  const clients = await prisma.client.findMany({
    include: {
      users: {
        orderBy: { createdAt: "asc" },
        take: 1,
      },
      _count: {
        select: { jobApplications: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const rows = clients.map((c) => ({
    id: c.id,
    name: c.name,
    primaryContactEmail: c.users[0]?.email ?? "",
    jobApplicationsCount: c._count.jobApplications,
  }));

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-semibold">Clients</h1>
      <ClientsTable rows={rows} />
    </div>
  );
}
