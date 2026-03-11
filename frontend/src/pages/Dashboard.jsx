import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ProjectList from "../components/project/ProjectList";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-64 pt-16 p-8">
        <ProjectList />
      </div>
    </>
  );
};

export default Dashboard;
