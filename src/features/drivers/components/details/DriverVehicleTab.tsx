import type { Driver, DriverDetails } from "../../drivers.types";
import { Field } from "./DriverDetailsShared";

const DriverVehicleTab = ({ driver, details }: { driver: Driver; details: DriverDetails }) => {
  const vehicle = details.vehicle;

  return (
    <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
      <Field label="Vehicle" value={driver.vehicle} />
      <Field label="Vehicle Type" value={vehicle.type} />
      <Field label="Model" value={vehicle.model} />
      <Field label="Vehicle Number" value={vehicle.vehicleNumber} />
      <Field label="Registration Number" value={vehicle.registrationNumber} />
      <Field label="Permit Number" value={vehicle.permitNumber} />
      <Field label="Insurance Number" value={vehicle.insuranceNumber} />
      <Field label="Year of Manufacture" value={vehicle.yearOfManufacture} />
      <Field label="Insurance Verification" value={vehicle.insuranceVerified ? "Verified" : "Pending"} />
      <Field label="Insurance Remarks" value={vehicle.insuranceRemarks} />

      {vehicle.insuranceDocumentUrl && (
        <div className="sm:col-span-2">
          <a
            href={vehicle.insuranceDocumentUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-brand-primary hover:underline"
          >
            View insurance document
          </a>
        </div>
      )}
    </div>
  );
};

export default DriverVehicleTab;
