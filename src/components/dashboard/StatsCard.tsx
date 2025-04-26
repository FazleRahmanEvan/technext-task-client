import React from "react";

export default function StatsCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Title
          </p>
          <p className="text-2xl font-bold mt-1">Value</p>
        </div>
        <div className="p-3 rounded-full "></div>
      </div>
    </div>
  );
}
