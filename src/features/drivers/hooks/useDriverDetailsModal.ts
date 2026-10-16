import { useCallback, useState } from "react";

import type { Driver } from "../drivers.types";

export const useDriverDetailsModal = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const openDriver = useCallback((driver: Driver) => {
    setSelectedDriver(driver);
  }, []);

  const closeDriver = useCallback(() => {
    setSelectedDriver(null);
  }, []);

  return {
    selectedDriver,
    openDriver,
    closeDriver,
  };
};
