import { dataStore } from "./dataStore";
import useBoardStore from "./useBoardStore";
import useCardStore from "./useCardStore";
import useTaskListStore from "./useTaskListStore";

// Use individual stores as needed
const useStore = () => ({
  boardStore: useBoardStore(),
  taskListStore: useTaskListStore(),
  cardListStore: useCardStore(),
  dataStore: dataStore(),
  // userStore: useUserStore(),
});

export default useStore;
