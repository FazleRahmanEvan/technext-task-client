/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClient, createClient, updateClient } from "../../api/clientApi";
import ClientForm from "../../components/client/ClientForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-hot-toast";
import { Client, ClientFormData } from "../../types/client";

export default function ClientFormPage() {
  const { id } = useParams<{ id: string }>(); // Ensuring id is typed as string or undefined
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  // Fetch client data for editing
  const {
    data: client,
    isLoading,
    isError,
  } = useQuery<Client | null>({
    queryKey: ["client", id],
    queryFn: () => getClient(id!),
    enabled: !!id, // only enabled if there's an id
  });

  // Create mutation: expects a Promise<Client>
  const createMutation = useMutation<Client, Error, ClientFormData>({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client created successfully");
      navigate("/clients");
    },
    onError: (error) => {
      toast.error(error.message || "Error creating client");
    },
  });

  // Update mutation: expects a Promise<Client>
  const updateMutation = useMutation<Client, Error, ClientFormData>({
    mutationFn: (data: ClientFormData) => updateClient(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", id] });
      toast.success("Client updated successfully");
      navigate(`/clients/${id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error updating client");
    },
  });

  const handleSubmit = async (data: ClientFormData) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (error) {
      // You can also add type checking here if necessary
      toast.error("Error occurred during submission");
    }
  };

  // Loading or error state for the query
  if (isLoading) return <LoadingSpinner />;
  if (isError || !client) return <div>Error loading client data</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isEditing ? "Edit Client" : "Create New Client"}
      </h1>

      <ClientForm
        defaultValues={client}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
