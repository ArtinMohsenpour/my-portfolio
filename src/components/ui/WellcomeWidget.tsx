import { DashboardWidget } from "@sanity/dashboard";

export function WelcomeWidget(): DashboardWidget {
  return {
    name: "welcome-widget",
    component: () => (
      <div className="min-h-[200px] flex flex-col bg-white">
        {/* 1. Hero Header */}
        <div className="bg-[#101112] p-8 text-white rounded-t-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">👋</span>
            <h3 className="text-3xl font-bold tracking-tight">Welcome Back!</h3>
          </div>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            This is your content command center. Manage your portfolio, add new
            projects, and keep your skills up to date from the{" "}
            <strong className="text-white">Content</strong> tab.
          </p>
        </div>

        {/* 2. Status Cards Container */}
        <div className="p-6 border-x border-b border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A: Developer Support */}
            <div className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500">
                  Developer Support
                </h4>
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>

              <div>
                <a
                  href="mailto:mohsenpour.artin@gmail.com"
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  mohsenpour.artin@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Direct line for technical assistance & updates.
                </p>
              </div>
            </div>

            {/* Card B: System Status */}
            <div className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500">
                  System Status
                </h4>
                {/* Ping Animation */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>

              <div>
                <div className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  All Systems Operational
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Your portfolio is live and serving traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Tip Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>Pro tip: Changes are saved automatically as you type.</span>
          </div>
        </div>
      </div>
    ),
    layout: { width: "full" },
  };
}
