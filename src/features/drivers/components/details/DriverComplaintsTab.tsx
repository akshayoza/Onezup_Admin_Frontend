import type { DriverDetails } from "../../drivers.types";
import { Field, SectionTitle, StatusBadge } from "./DriverDetailsShared";
import { formatDate } from "./driverDetails.utils";

const DriverComplaintsTab = ({ details }: { details: DriverDetails }) => (
  <div className="space-y-4 p-5 sm:p-7">
    <SectionTitle>Complaints</SectionTitle>

    {details.complaints.length === 0 ? (
      <p className="text-sm text-text-secondary">No complaints available for this driver.</p>
    ) : (
      details.complaints.map((complaint) => (
        <article key={complaint.id} className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-medium text-text-primary">{complaint.category}</h4>
            <StatusBadge status={complaint.status} />
          </div>
          <Field label="Passenger" value={complaint.passengerName} />
          <Field label="Date" value={formatDate(complaint.date)} />
          <p className="break-words text-sm text-text-secondary">{complaint.description}</p>
        </article>
      ))
    )}
  </div>
);

export default DriverComplaintsTab;
