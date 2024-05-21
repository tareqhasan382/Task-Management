import useBoardStore from "./useBoardStore";
import useCardStore from "./useCardStore";
import useTaskListStore from "./useTaskListStore";

const useStore = () => ({
  boardStore: useBoardStore(),
  taskListStore: useTaskListStore(),
  cardListStore: useCardStore(),
});

export default useStore;
