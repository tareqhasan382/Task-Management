import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  // loader: true,
  // toastrMsg: "",
  // isLoggedIn: false,
  // boards: [],
  // areBoardsFetched: false,
  // setToastr: (toastrMsg) => set({ toastrMsg }, false, "setToastr"),
  // setBoards: (boards) =>
  //   set({ boards, areBoardsFetched: true }, false, "setBoards"),
  // addBoard: (board) =>
  //   set((old) => ({ boards: [board, ...old.boards] }), false, "addBoard"),
  // setLoginStatus: (status) => set({ isLoggedIn: status, loader: false }),
  // searchQuery: "",
  // setSearchQuery: (query) => set({ searchQuery: query }),
  //================================================================

  boards: [],
  loading: false,
  fetchBoards: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/board");
      const data = await response.json();
      set({ boards: data?.data });
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      set({ loading: false });
    }
  },
  createBoard: async (newBoard) => {
    set((state) => ({
      boards: [newBoard, ...state.boards],
    }));
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
});
//====================

const useStore = create(devtools(store));

export default useStore;

/*
 setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false,
      },
      false,
      "setLoginStatus"
    ),
*/
