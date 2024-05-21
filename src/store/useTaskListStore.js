import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTaskListStore = create(
  devtools((set, get) => ({
    taskList: [],
    newOrder: 0,
    areFetched: false,
    loading: false,
    fetchTaskList: async (id) => {
      set({ loading: true });
      try {
        if (!id) return;
        const response = await fetch(`/api/tasklist/${id}`);
        const data = await response.json();
        const sortedTaskList = data?.data.sort((a, b) => a.order - b.order);
        set({
          taskList: sortedTaskList,
          areFetched: true,
          newOrder: data?.newOrder,
        });
      } catch (error) {
        console.error("Error fetching Task List:", error);
      } finally {
        set({ loading: false });
      }
    },
    createTaskList: async (newTaskList) => {
      try {
        const response = await fetch("/api/tasklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskList),
        });

        if (!response.ok) {
          throw new Error("Failed to create Task List");
        }
      } catch (error) {
        console.error("Error creating Task:", error);
      }
    },
    deleteBoard: async (boardId) => {
      try {
        const response = await fetch(`/api/board/${boardId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to delete TaskList");
        }
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    },
  }))
);

export default useTaskListStore;
