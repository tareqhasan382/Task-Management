import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useCardStore = create(
  devtools((set, get) => ({
    cardList: [],
    newOrder: 0,
    areFetched: false,
    loading: false,
    dragTask: null,
    setDragTask: (id) => {
      console.log(`"setDragTask:"id ${id}`);
      set({ dragTask: id });
    },
    moveTask: (id, newOrder) => {
      console.log(`"moveTask:"id ${id} newOrder ${newOrder}`);
      set((state) => ({
        cardList: state.cardList.map((task) =>
          task._id === id ? { ...task, order: newOrder } : task
        ),
      }));
    },
    //========================================================
    fetchCardList: async (id) => {
      try {
        const response = await fetch(`/api/taskcard/${id}`);
        const data = await response.json();
        set({ cardList: data.data });
      } catch (error) {
        set({ loading: false });
        console.error("Failed to fetch card list", error);
      }
    },
    createCardList: async (newTaskList) => {
      try {
        console.log("store data:", newTaskList);
        const response = await fetch("/api/taskcard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTaskList),
        });

        if (!response.ok) {
          throw new Error("Failed to create Task Card");
        }
      } catch (error) {
        console.error("Error creating Task:", error);
      }
    },
    updateCardList: async ({ id, data }) => {
      console.log(`data ${data} id ${id}`);
      try {
        const response = await fetch(`/api/taskcard/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to Update Task Card");
        }
      } catch (error) {
        console.error("Error Updating Task:", error);
      }
    },
    deleteCard: async (id) => {
      try {
        const response = await fetch(`/api/taskcard/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to delete card");
        }
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    },
  }))
);

export default useCardStore;
