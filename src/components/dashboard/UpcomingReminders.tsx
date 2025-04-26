export default function UpcomingReminders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Upcoming Reminders</h2>

      <p className="text-gray-500 dark:text-gray-400">No upcoming reminders</p>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">title</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due: Date
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
