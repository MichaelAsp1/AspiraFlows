// app/admin/clients/ClientsTable.tsx
"use client";

type Row = {
  id: string;
  name: string;
  primaryContactEmail: string;
  jobApplicationsCount: number;
};

export default function ClientsTable({ rows }: { rows: Row[] }) {
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Client ID copied");
    } catch {
      alert("Failed to copy");
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-3 py-2 border-r">Name</th>
            <th className="text-left px-3 py-2 border-r">Client ID</th>
            <th className="text-left px-3 py-2 border-r">Primary contact</th>
            <th className="text-right px-3 py-2 border-r">Job applications</th>
            <th className="text-right px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-b-0">
              <td className="px-3 py-2 align-top">{r.name}</td>
              <td className="px-3 py-2 align-top">
                <code className="text-xs break-all">{r.id}</code>
              </td>
              <td className="px-3 py-2 align-top">{r.primaryContactEmail}</td>
              <td className="px-3 py-2 text-right align-top">
                {r.jobApplicationsCount}
              </td>
              <td className="px-3 py-2 text-right align-top">
                <button
                  onClick={() => copy(r.id)}
                  className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                >
                  Copy ID
                </button>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                No clients yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
