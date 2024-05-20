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
      // const previousTaskList = get().taskList;
      // const optimisticTaskList = [...previousTaskList, newTaskList];

      // // Optimistically update the task list
      // set({ taskList: optimisticTaskList });

      try {
        const response = await fetch("/api/tasklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskList),
        });

        if (!response.ok) {
          throw new Error("Failed to create Task List");
        }

        // Fetch the latest task list after successful creation
        await get().fetchTaskList();
      } catch (error) {
        console.error("Error creating Task:", error);
        // Revert to the previous task list if the request fails
        // set({ taskList: previousTaskList });
      }
    },
    deleteBoard: async (boardId) => {
      const previousTaskList = get().taskList;
      const optimisticTaskList = previousTaskList.filter(
        (task) => task._id !== boardId
      );

      // Optimistically update the task list
      set({ taskList: optimisticTaskList });

      try {
        const response = await fetch(`/api/board/${boardId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to delete TaskList");
        }

        // Fetch the latest task list after successful deletion
        await get().fetchTaskList();
      } catch (error) {
        console.error("Error deleting board:", error);
        // Revert to the previous task list if the request fails
        set({ taskList: previousTaskList });
      }
    },
    addList: (list) =>
      set(
        (state) => ({ taskList: [list, ...state.taskList] }),
        false,
        "addList"
      ),
    setList: (taskList) =>
      set({ taskList, areBoardsFetched: true }, false, "setList"),
  }))
);

export default useTaskListStore;
