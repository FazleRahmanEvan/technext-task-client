import ProjectsChart from "../../components/dashboard/ProjectsChart";
import StatsCard from "../../components/dashboard/StatsCard";
import UpcomingReminders from "../../components/dashboard/UpcomingReminders";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard />
        <StatsCard />
        <StatsCard />
        <StatsCard />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProjectsChart />
        <UpcomingReminders />
      </div>
    </div>
  );
}
