import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../../slices/taskSlice";
import { toast } from "react-hot-toast";

const TaskModal = ({ task, boardId, onClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    task || {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    },
  );
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Load comments
  useEffect(() => {
    if (task?._id) {
      api
        .get(`/comments?task=${task._id}`)
        .then((res) => setComments(res.data.data));
    }
  }, [task]);

  const saveChanges = async () => {
    try {
      if (task?._id) {
        await dispatch(updateTask({ taskId: task._id, data: form }));
        toast.success("Task updated!");
      } else {
        await dispatch(
          createTask({
            ...form,
            board: boardId,
          }),
        );
        toast.success("Task created!");
      }

      onClose();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const addComment = async () => {
    if (!newComment.trim() || !task?._id) return;
    await api.post("/comments", { task: task._id, text: newComment });
    const res = await api.get(`/comments?task=${task._id}`);
    setComments(res.data.data);
    setNewComment("");
    toast.success("Comment added");
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl p-10 shadow-2xl max-h-[92vh] overflow-auto">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full text-3xl font-semibold bg-transparent border-b dark:border-gray-700 focus:outline-none"
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description..."
          className="w-full mt-6 h-32 bg-transparent border dark:border-gray-700 rounded-2xl p-4"
        />

        <div className="grid grid-cols-3 gap-6 my-10">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
            <input
              type="date"
              value={form.dueDate ? form.dueDate.split("T")[0] : ""}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border dark:border-gray-700 rounded-2xl p-3 bg-transparent"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Priority</p>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full border dark:border-gray-700 rounded-2xl p-3 bg-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border dark:border-gray-700 rounded-2xl p-3 bg-transparent"
            >
              <option value="Todo">To Do</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <button
          onClick={saveChanges}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold mb-10"
        >
          Save Changes
        </button>

        {/* Comments */}
        <h4 className="font-semibold mb-4">Comments</h4>
        <div className="max-h-64 overflow-y-auto space-y-4 mb-6">
          {comments?.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl"
            >
              <p className="font-medium">{c.user?.name}</p>
              <p>{c.text}</p>
              <p className="text-xs text-gray-500">
                {format(new Date(c.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border dark:border-gray-700 rounded-2xl px-6 py-4"
          />
          <button
            onClick={addComment}
            className="bg-blue-600 text-white px-8 rounded-2xl"
          >
            Send
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-10 w-full py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
