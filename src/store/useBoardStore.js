import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useBoardStore = create(
  devtools((set, get) => ({
    boards: [],
    areBoardsFetched: false,
    loading: false,
    fetchBoards: async () => {
      set({ loading: true });
      try {
        const response = await fetch("/api/board");
        const data = await response.json();
        set({ boards: data?.data, areBoardsFetched: true });
      } catch (error) {
        console.error("Error fetching boards:", error);
      } finally {
        set({ loading: false });
      }
    },
    createBoard: async (newBoard) => {
      try {
        const response = await fetch("/api/board", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBoard),
        });
        if (!response.ok) {
          throw new Error("Failed to create board");
        }
      } catch (error) {
        console.error("Error creating board:", error);
      }
    },
    deleteBoard: async (boardId) => {
      try {
        const response = await fetch(`/api/board/${boardId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to delete board");
        }
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    },
  }))
);

export default useBoardStore;
