const DashboardHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Real-time overview of your ride-sharing platform
        </p>
      </div>

      <button
        type="button"
        className="cursor-pointer self-start text-sm font-medium text-text-primary transition-colors hover:text-brand-primary"
      >
        Demand Hotspot
      </button>
    </div>
  );
};

export default DashboardHeader;