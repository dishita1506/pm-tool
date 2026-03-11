import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { fetchTasks, updateTaskStatus } from "../../slices/taskSlice";
import TaskCard from "../task/TaskCard";

const columns = [
  {
    id: "Todo",
    title: "To Do",
    color: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    id: "InProgress",
    title: "In Progress",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    id: "Done",
    title: "Done",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
];

const BoardView = ({ boardId, onTaskClick, filters }) => {
  const dispatch = useDispatch();
  const tasksByBoard = useSelector((state) => state.tasks.tasksByBoard);
  const boardTasks = tasksByBoard[boardId] || [];

  useEffect(() => {
    dispatch(fetchTasks(boardId));
  }, [boardId, dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    dispatch(
      updateTaskStatus({
        taskId: result.draggableId,
        status: result.destination.droppableId,
      }),
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-8 p-6">
        {columns.map((col) => {
          const filteredTasks = boardTasks.filter((t) => {
            const matchesStatus = filters?.status
              ? t.status === filters.status
              : true;

            const matchesSearch = filters?.search
              ? (t.title + " " + (t.description || ""))
                  .toLowerCase()
                  .includes(filters.search.toLowerCase())
              : true;

            return matchesStatus && matchesSearch && t.status === col.id;
          });

          return (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-3xl p-6 min-h-[680px] border transition-all ${
                    snapshot.isDraggingOver
                      ? "border-blue-500 bg-blue-950/30"
                      : ""
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 px-6 py-2 rounded-3xl text-sm font-semibold mb-8 ${col.color}`}
                  >
                    {col.title}
                  </div>

                  {filteredTasks.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center">
                      <div className="text-6xl mb-4 opacity-30">📬</div>
                      <p className="text-gray-500">No tasks found</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Try adjusting your filters
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} onClick={onTaskClick} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default BoardView;
