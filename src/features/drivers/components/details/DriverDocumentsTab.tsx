import type { DriverDetails } from "../../drivers.types";
import { SectionTitle, StatusBadge } from "./DriverDetailsShared";
import { formatDate } from "./driverDetails.utils";

const DriverDocumentsTab = ({ details }: { details: DriverDetails }) => (
  <div className="space-y-4 p-5 sm:p-7">
    <SectionTitle>Driver Documents</SectionTitle>

    {details.documents.length === 0 ? (
      <p className="text-sm text-text-secondary">No documents available.</p>
    ) : (
      details.documents.map((document) => (
        <article key={document.id} className="rounded-lg border border-border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="font-medium text-text-primary">{document.title}</h4>
              <p className="mt-1 break-words text-sm text-text-secondary">
                Document No: {document.documentNumber || "Not provided"}
              </p>
              {document.expiryDate && (
                <p className="mt-1 text-sm text-text-secondary">
                  Expiry: {formatDate(document.expiryDate)}
                </p>
              )}
            </div>
            <StatusBadge status={document.status} />
          </div>

          {document.remarks && (
            <p className="mt-3 text-sm text-text-secondary">Remarks: {document.remarks}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-4">
            <a href={document.frontImageUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-primary hover:underline">
              View front image
            </a>
            {document.backImageUrl && (
              <a href={document.backImageUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-brand-primary hover:underline">
                View back image
              </a>
            )}
          </div>
        </article>
      ))
    )}
  </div>
);

export default DriverDocumentsTab;
