import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../../slices/projectSlice";

const Sidebar = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { list: projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="w-72 bg-white dark:bg-gray-950 border-r dark:border-gray-800 h-screen pt-16 fixed overflow-y-auto shadow-sm">
      <div className="p-6">
        <div className="uppercase text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 mb-4 px-3">
          WORKSPACES
        </div>

        <div className="space-y-1">
          {!projects || projects.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm px-3 py-8 text-center">
              No projects yet
            </p>
          ) : (
            projects.map((p) => (
              <Link
                key={p._id}
                to={`/project/${p._id}`}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-3xl text-sm font-medium transition-all group
                  ${
                    p._id === projectId
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }`}
              >
                <span className="text-xl">📁</span>
                <span className="truncate">{p.title}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
