// hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "@/api/instance";

type User = {
	id: number;
	name: string;
	email: string;
};

export function useUsers() {
	return useQuery({
		queryKey: ["users"],
		queryFn: () => instance.get<User[]>("/users").then((r) => r.data),
	});
}

export function useUser(id: number) {
	return useQuery({
		queryKey: ["users", id],
		queryFn: () => instance.get<User>(`/users/${id}`).then((r) => r.data),
		enabled: !!id,
	});
}

export function useCreateUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: Omit<User, "id">) =>
			instance.post<User>("/users", payload).then((r) => r.data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
	});
}

export function useUpdateUser(id: number) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (payload: Partial<User>) =>
			instance.patch<User>(`/users/${id}`, payload).then((r) => r.data),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
	});
}

export function useDeleteUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => instance.delete(`/users/${id}`),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
	});
}
