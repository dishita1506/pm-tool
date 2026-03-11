import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../slices/projectSlice";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProject({ title, description }));
    setTitle("");
    setDescription("");
    setShow(false);
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-3xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition"
      >
        + New Project
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-10 w-full max-w-lg shadow-2xl"
          >
            <h3 className="text-3xl font-semibold mb-8">Create New Project</h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Name"
              className="w-full border border-gray-200 focus:border-blue-500 p-4 rounded-2xl text-lg mb-5"
              required
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              className="w-full border border-gray-200 focus:border-blue-500 p-4 rounded-2xl h-32 resize-none"
            />

            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ProjectForm;
