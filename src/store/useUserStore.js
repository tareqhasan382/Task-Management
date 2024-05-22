import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools((set, get) => ({
    users: [],
    areUsersFetched: false,
    loading: false,
    fetchUsers: async () => {
      set({ loading: true });
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        set({
          users: data?.data,
          areUsersFetched: true,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        set({ loading: false });
      }
    },
    user: async (userId) => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to retrive user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  }))
);

export default useUserStore;
