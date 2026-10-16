
import type {
  Driver,
  DriverDetails,
} from "./drivers.types";

export const MOCK_DRIVERS: Driver[] = [
  {
    id: "1",
    driverCode: "DR12345",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    email: "john.doe@gmail.com",
    vehicle: "Sedan - KA01",
    rating: 5,
    contact: "8972223461",
    ridesTaken: 230,
    walletBalance: 20000,
    lifetimeEarnings: 89000,
    cancellationCount: 3,
    totalBookings: 24,
    driverStatus: "online",
    verificationStatus: "verified",
    payoutStatus: "processed",
    city: "Bengaluru",
    joinedAt: "2025-11-22",
  },
  {
    id: "2",
    driverCode: "DR12346",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    email: "john.doe2@gmail.com",
    vehicle: "SUV",
    rating: 3.5,
    contact: "8972223462",
    ridesTaken: 400,
    walletBalance: 32000,
    lifetimeEarnings: 65000,
    cancellationCount: 3,
    totalBookings: 24,
    driverStatus: "online",
    verificationStatus: "pending",
    payoutStatus: "pending",
    city: "Pune",
    joinedAt: "2025-11-22",
  },
  {
    id: "3",
    driverCode: "DR12347",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    email: "john.doe3@gmail.com",
    vehicle: "SUV",
    rating: 2,
    contact: "8972223463",
    ridesTaken: 280,
    walletBalance: 40000,
    lifetimeEarnings: 72000,
    cancellationCount: 5,
    totalBookings: 35,
    driverStatus: "offline",
    verificationStatus: "verified",
    payoutStatus: "failed",
    city: "Pune",
    joinedAt: "2025-11-20",
  },
  {
    id: "4",
    driverCode: "DR12348",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    email: "john.doe4@gmail.com",
    vehicle: "Sedan - KA01",
    rating: 1,
    contact: "8972223464",
    ridesTaken: 240,
    walletBalance: 22000,
    lifetimeEarnings: 48000,
    cancellationCount: 8,
    totalBookings: 40,
    driverStatus: "online",
    verificationStatus: "verified",
    payoutStatus: "processed",
    city: "Delhi",
    joinedAt: "2025-11-19",
  },
  {
    id: "5",
    driverCode: "DR12349",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=52",
    email: "john.doe5@gmail.com",
    vehicle: "Hatchback",
    rating: 2,
    contact: "8972223465",
    ridesTaken: 260,
    walletBalance: 10000,
    lifetimeEarnings: 38000,
    cancellationCount: 4,
    totalBookings: 28,
    driverStatus: "online",
    verificationStatus: "pending",
    payoutStatus: "on_hold",
    city: "Delhi",
    joinedAt: "2025-11-18",
  },
  {
    id: "6",
    driverCode: "DR12350",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    email: "john.doe6@gmail.com",
    vehicle: "Sedan - KA01",
    rating: 2,
    contact: "8972223466",
    ridesTaken: 270,
    walletBalance: 10000,
    lifetimeEarnings: 42000,
    cancellationCount: 6,
    totalBookings: 31,
    driverStatus: "offline",
    verificationStatus: "verified",
    payoutStatus: "pending",
    city: "Pune",
    joinedAt: "2025-11-17",
  },
  {
    id: "7",
    driverCode: "DR12351",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    email: "john.doe7@gmail.com",
    vehicle: "Hatchback",
    rating: 2,
    contact: "8972223467",
    ridesTaken: 290,
    walletBalance: 32000,
    lifetimeEarnings: 56000,
    cancellationCount: 2,
    totalBookings: 25,
    driverStatus: "online",
    verificationStatus: "verified",
    payoutStatus: "processed",
    city: "Pune",
    joinedAt: "2025-11-16",
  },
  {
    id: "8",
    driverCode: "DR12352",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=60",
    email: "john.doe8@gmail.com",
    vehicle: "Hatchback",
    rating: 2,
    contact: "8972223468",
    ridesTaken: 500,
    walletBalance: 32000,
    lifetimeEarnings: 95000,
    cancellationCount: 7,
    totalBookings: 42,
    driverStatus: "offline",
    verificationStatus: "pending",
    payoutStatus: "failed",
    city: "Pune",
    joinedAt: "2025-11-15",
  },
  {
    id: "9",
    driverCode: "DR12353",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    email: "john.doe9@gmail.com",
    vehicle: "Hatchback",
    rating: 2,
    contact: "8972223469",
    ridesTaken: 500,
    walletBalance: 32000,
    lifetimeEarnings: 92000,
    cancellationCount: 5,
    totalBookings: 38,
    driverStatus: "offline",
    verificationStatus: "pending",
    payoutStatus: "pending",
    city: "Pune",
    joinedAt: "2025-11-14",
  },
  {
    id: "10",
    driverCode: "DR12354",
    name: "Akshay",
    avatarUrl: "https://i.pravatar.cc/150?img=70",
    email: "akshay.driver@gmail.com",
    vehicle: "SUV",
    rating: 3.5,
    contact: "8972223470",
    ridesTaken: 400,
    walletBalance: 32000,
    lifetimeEarnings: 65000,
    cancellationCount: 3,
    totalBookings: 24,
    driverStatus: "online",
    verificationStatus: "pending",
    payoutStatus: "pending",
    city: "Pune",
    joinedAt: "2025-11-22",
  },
];

const createDriverDetails = (
  driver: Driver,
  index: number,
): DriverDetails => {
  const [firstName, ...lastNameParts] = driver.name.split(" ");

  const rideStatuses = [
    "completed",
    "completed",
    "cancelled",
    "completed",
    "completed",
    "completed",
  ] as const;

  const rides = Array.from({ length: 6 }, (_, rideIndex) => {
    const rideDate = new Date(
      Date.UTC(2026, 8, 2 - rideIndex),
    );

    return {
      id: `${driver.id}-ride-${rideIndex + 1}`,
      passengerName: [
        "Harry Challan",
        "Priya Sharma",
        "Rahul Patel",
        "Neha Verma",
        "Aarav Shah",
        "Riya Mehta",
      ][(rideIndex + index) % 6],
      passengerId: `RD${driver.driverCode}${rideIndex + 1}`,
      date: rideDate.toISOString().slice(0, 10),
      time: ["10:34 pm", "08:15 am", "06:45 pm"][
        rideIndex % 3
      ],
      distanceKm: [21.51, 12.4, 8.75, 16.2, 5.8, 24.3][
        rideIndex
      ],
      durationMinutes: [40, 28, 22, 35, 16, 45][rideIndex],
      fare: [146.71, 220, 95, 180, 85, 310][rideIndex],
      status: rideStatuses[rideIndex],
      pickupLocation: [
        "Connaught Palace, 123 ABC Mall, New Delhi, 012345",
        "MG Road, Bengaluru",
        "FC Road, Pune",
        "India Gate, New Delhi",
      ][rideIndex % 4],
      dropoffLocation: [
        "Chandni Chowk, New Delhi, 054321",
        "Indiranagar, Bengaluru",
        "Koregaon Park, Pune",
        "Connaught Place, New Delhi",
      ][rideIndex % 4],
    };
  });

  return {
    driverId: driver.id,

    profile: {
      firstName: firstName || driver.name,
      lastName: lastNameParts.join(" "),
      mobile: driver.contact,
      email: driver.email ?? `${driver.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      registrationDate: driver.joinedAt,
      currentDevice: "iPhone 13 - iOS 17 - App v5.3.1",
      lastActive: driver.driverStatus === "online" ? "1 min ago" : "Yesterday",
      recentDevices: [
        "iPhone 13",
        "Pixel 5",
        "Web dashboard",
      ],
      pushNotificationsEnabled: true,
    },

    vehicle: {
      type: driver.vehicle.toLowerCase().includes("suv")
        ? "SUV"
        : driver.vehicle.toLowerCase().includes("hatchback")
          ? "Hatchback"
          : "Sedan",
      model: driver.vehicle,
      vehicleNumber: `MH${29 + index} BB${String(116 + index).padStart(3, "0")}`,
      registrationNumber: `MH${29 + index} BB${String(116 + index).padStart(3, "0")}`,
      permitNumber: `PERMIT-${driver.driverCode}`,
      insuranceNumber: `INS-${driver.driverCode}`,
      yearOfManufacture: "2022",
      insuranceDocumentUrl: "https://placehold.co/640x360?text=Vehicle+Insurance",
      insuranceVerified: driver.verificationStatus === "verified",
      insuranceRemarks:
        driver.verificationStatus === "verified"
          ? "Document verified successfully."
          : "The uploaded document is awaiting verification.",
    },

    documents: [
      {
        id: `${driver.id}-aadhaar`,
        title: "Aadhaar Card",
        documentNumber: `XXXX XXXX ${String(1234 + index).padStart(4, "0")}`,
        frontImageUrl: "https://placehold.co/640x360?text=Aadhaar+Front",
        backImageUrl: "https://placehold.co/640x360?text=Aadhaar+Back",
        status: driver.verificationStatus,
        remarks:
          driver.verificationStatus === "verified"
            ? "Document verified."
            : "Document pending verification.",
      },
      {
        id: `${driver.id}-license`,
        title: "Driving License",
        documentNumber: `DL-${driver.driverCode}`,
        frontImageUrl: "https://placehold.co/640x360?text=Driving+License",
        backImageUrl: "https://placehold.co/640x360?text=License+Back",
        expiryDate: "2028-12-06",
        status: driver.verificationStatus,
        remarks:
          driver.verificationStatus === "verified"
            ? "Driving license verified."
            : "Please review the uploaded driving license.",
      },
    ],

    payments: [
      {
        id: `${driver.id}-payment-1`,
        date: driver.joinedAt,
        description: "Weekly driver payout",
        amount: Math.round(driver.walletBalance * 0.25),
        status: driver.payoutStatus,
        reference: `PAY-${driver.driverCode}-001`,
      },
      {
        id: `${driver.id}-payment-2`,
        date: "2026-09-01",
        description: "Ride earnings settlement",
        amount: Math.round(driver.walletBalance * 0.15),
        status: driver.payoutStatus,
        reference: `PAY-${driver.driverCode}-002`,
      },
      {
        id: `${driver.id}-payment-3`,
        date: "2026-08-25",
        description: "Previous weekly payout",
        amount: Math.round(driver.walletBalance * 0.1),
        status: "processed",
        reference: `PAY-${driver.driverCode}-003`,
      },
    ],

    rides,

    complaints: [
      {
        id: `${driver.id}-complaint-1`,
        passengerName: "Priya Sharma",
        date: "2026-09-03",
        category: "Late arrival",
        description: "The driver arrived later than the estimated pickup time.",
        status: "open",
      },
      {
        id: `${driver.id}-complaint-2`,
        passengerName: "Rahul Patel",
        date: "2026-08-28",
        category: "Trip experience",
        description: "Passenger reported an issue with the overall trip experience.",
        status: "in_review",
      },
      {
        id: `${driver.id}-complaint-3`,
        passengerName: "Neha Verma",
        date: "2026-08-19",
        category: "Payment query",
        description: "Passenger requested clarification about the trip fare.",
        status: "resolved",
      },
    ],
  };
};

export const MOCK_DRIVER_DETAILS: DriverDetails[] =
  MOCK_DRIVERS.map(createDriverDetails);

export const getDriverDetails = (
  driverId: string,
): DriverDetails | undefined =>
  MOCK_DRIVER_DETAILS.find((details) => details.driverId === driverId);
