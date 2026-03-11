// You can use this if you want a board selector later
import { useSelector } from "react-redux";

const BoardList = () => {
  const { list } = useSelector((state) => state.boards);
  return <div>{/* Render board tabs if needed */}</div>;
};

export default BoardList;
