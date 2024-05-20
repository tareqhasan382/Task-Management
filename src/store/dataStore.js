import { toast } from "react-toastify";
import { create } from "zustand";
// '2024-05-14'
const store = (set) => ({
  tasks: [
    {
      title: "Task A",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "PLANED",
      dueDate: "2024-04-25",
      id: 1,
    },
    {
      title: "Task B",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "PLANED",
      dueDate: "2024-05-10",
      id: 2,
    },
    {
      title: "Task C",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "DONE",
      dueDate: "2024-05-05",
      id: 3,
    },
    {
      title: "Task D",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "ONGOING",
      dueDate: "2024-02-25",
      id: 4,
    },
    {
      title: "Task E",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "ONGOING",
      dueDate: "2024-04-04",
      id: 5,
    },
    {
      title: "Task F",
      content:
        "<p>Tareq In publishing and graphic design, Lorem ipsum is a placeholder text1</p>",
      state: "DONE",
      dueDate: "2024-04-02",
      id: 6,
    },
  ],
  loader: true,
  isLoggedIn: false,
  dragTask: null,
  addTask: (data) => {
    set((state) => ({ tasks: [...state.tasks, data] })),
      toast.success("Created Task");
  },
  editTask: (id, newData) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...newData } : task
      ),
    }));
    toast.success("Updated Task");
  },
  deleteTask: (data) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== data),
    }));
    toast.success("Deleted Task");
  },
  setDragTask: (id) => set({ dragTask: id }),
  moveTask: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, state: status } : task
      ),
    }));
  },
  setTasks: (mockData) => {
    set((state) => ({ ...state, tasks: mockData }));
    console.log("mockData:", mockData);
  },
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
});

export const dataStore = create(store);
