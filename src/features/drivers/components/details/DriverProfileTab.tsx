import type { DriverDetails } from "../../drivers.types";
import { Field, SectionTitle } from "./DriverDetailsShared";
import { formatDate } from "./driverDetails.utils";

const DriverProfileTab = ({ details }: { details: DriverDetails }) => (
  <div className="grid gap-8 p-5 sm:grid-cols-2 sm:p-7">
    <section className="space-y-5">
      <SectionTitle>Personal Information</SectionTitle>
      <Field label="First Name" value={details.profile.firstName} />
      <Field label="Last Name" value={details.profile.lastName} />
      <Field label="Mobile Number" value={details.profile.mobile} />
      <Field label="Email" value={details.profile.email} />
      <Field label="Registration Date" value={formatDate(details.profile.registrationDate)} />
    </section>

    <section className="space-y-5 border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
      <SectionTitle>Devices &amp; Session</SectionTitle>
      <Field label="Current Device" value={details.profile.currentDevice} />
      <Field label="Last Active" value={details.profile.lastActive} />
      <Field label="Recent Devices" value={details.profile.recentDevices.join(", ") || "None"} />
      <Field label="Push Notifications" value={details.profile.pushNotificationsEnabled ? "Enabled" : "Disabled"} />
    </section>
  </div>
);

export default DriverProfileTab;
