import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards, createBoard } from "../../slices/boardSlice";
import BoardView from "../board/BoardView";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import TaskModal from "../task/TaskModal";
import SearchFilter from "../common/SearchFilter";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { list: boards } = useSelector((state) => state.boards);
  const [selectedTask, setSelectedTask] = useState(null);
  const [boardTitle, setBoardTitle] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchBoards(projectId));
  }, [projectId, dispatch]);

  const handleCreateBoard = async () => {
    if (!boardTitle) return;
    await dispatch(createBoard({ title: boardTitle, project: projectId }));
    setBoardTitle("");
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-72 pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
              Project Boards
            </h1>
            <div className="flex gap-3">
              <input
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                placeholder="New Board Name"
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-blue-500 px-5 py-3 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                onClick={handleCreateBoard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition"
              >
                + Add Board
              </button>
            </div>
          </div>
          <SearchFilter onFilterChange={setFilters} />

          {boards?.map((board) => (
            <div key={board._id} className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {board.title}
                </h2>

                <button onClick={() => setSelectedTask({ board: board._id })}>
                  + Add Task
                </button>
              </div>

              <BoardView
                boardId={board._id}
                filters={filters}
                onTaskClick={setSelectedTask}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          boardId={selectedTask?.board}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};

export default ProjectDetail;
