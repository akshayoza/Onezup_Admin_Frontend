const DriversPageHeader = () => {
  return (
    <header className="flex min-w-0 items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Driver
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Manage drivers, review verification status, and monitor driver
          activity.
        </p>
      </div>
    </header>
  );
};

export default DriversPageHeader;
