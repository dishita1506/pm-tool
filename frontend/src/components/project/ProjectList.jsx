import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../slices/projectSlice";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
          My Projects
        </h1>
        <ProjectForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list?.map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500 rounded-3xl p-8 transition-all hover:shadow-2xl"
          >
            <div className="text-5xl mb-6">📋</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
              {project.description || "No description"}
            </p>
            <div className="mt-8 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
              Open Project{" "}
              <span className="text-xl transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
