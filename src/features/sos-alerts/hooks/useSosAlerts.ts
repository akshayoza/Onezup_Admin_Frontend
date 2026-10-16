import { MOCK_SOS_ALERTS } from "../sos-alerts.mock";

export const useSosAlerts = () => ({
  alerts: MOCK_SOS_ALERTS,
  isLoading: false,
  error: null as string | null,
});
