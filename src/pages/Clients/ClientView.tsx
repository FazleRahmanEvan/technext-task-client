import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getClient } from "../../api/clientApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import Button from "../../components/Button";

export default function ClientView() {
  const { id } = useParams<{ id: string }>();

  const { data: client, isPending } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id!),
    enabled: !!id, // Important: only run query if id exists
  });

  if (isPending) return <LoadingSpinner />;

  if (!client) return <div>Client not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <Link to={`/clients/${id}/edit`}>
          <Button>Edit Client</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Contact Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {client.email || "-"}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {client.phone}
            </p>
            <p>
              <span className="font-medium">Company:</span>{" "}
              {client.company || "-"}
            </p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Additional Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(client.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(client.updatedAt).toLocaleDateString()}
            </p>
            {client.notes && (
              <div>
                <p className="font-medium">Notes:</p>
                <p className="whitespace-pre-line">{client.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
