import { format } from "date-fns";

const TaskCard = ({ task, onClick }) => {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-amber-500",
    Low: "bg-emerald-500",
  };

  return (
    <div
      onClick={() => onClick?.(task)}
      className="bg-white dark:bg-gray-900 rounded-3xl p-7 mb-5 shadow-sm hover:shadow-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 cursor-pointer transition-all active:scale-[0.98]"
    >
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-[17px] leading-tight pr-4 text-gray-900 dark:text-white">
          {task.title}
        </h4>
        <div
          className={`w-3 h-3 rounded-full mt-1.5 ${priorityColor[task.priority]}`}
        />
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
          📅 {format(new Date(task.dueDate), "MMM dd")}
        </div>
      )}

      {task.assignedTo && (
        <div className="mt-5 flex items-center gap-3">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
            {task.assignedTo.name?.[0]}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {task.assignedTo.name}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
