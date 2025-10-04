"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
