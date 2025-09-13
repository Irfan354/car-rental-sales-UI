"use client"; // because Menubar is client-side

import React from "react";
import { Menubar } from "primereact/menubar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => router.push("/"),
    },
    // admin -> users, hosters, customers
    {
      label: "Admin",
      icon: "pi pi-users",
      items: [
        {
          label: "Users",
          icon: "pi pi-user",
          command: () => router.push("/admin/users"),
        },
        {
          label : "Hosters",
          icon : "pi pi-briefcase",
          command: () => router.push("/admin/hosters"),
        },
        {
          label : "Customers",
          icon : " pi pi-plus",
          command : () => router.push("/admin/customers"),
        },
      ],
    },
    // vehicle
    {
      label: "Vehicle",
      icon: "pi pi-car",
      items: [
        {
          label : "All Vehicles",
          icon : "pi pi-car",
          command : () => router.push("/vehicle/all-vehicles")
        },
        {
          label: "Brand",
          icon: "pi pi-apple",
          command: () => router.push("/vehicle/brand"),
        },
        {
          label: "Model",
          icon: "pi pi-table",
          command: () => router.push("/vehicle/model"),
        },
        {
          label: "Variant",
          icon: "pi pi-th-large",
          command: () => router.push("/vehicle/variant"),
        },
        {
          label: "Vehicle Type",
          icon: "pi pi-tag",
          command: () => router.push("/vehicle/vehicle-type"),
        },
        {
          label: "Fuel Type",
          icon: "pi pi-bolt",
          command: () => router.push("/admin/vehicle/fuel-type"),
        },
        {
          label: "Seater",
          icon: "pi pi-users",
          command: () => router.push("/vehicle/seater"),
        },
        {
          label: "Transmission",
          icon: "pi pi-cog",
          command: () => router.push("/vehicle/transmission"),
        },
        {
          label : "Engine Capacity",
          icon : "pi pi-cog",
          command : () => router.push("/vehicle/enginecapacity"),
        },
        {
          label : "Gears",
          icon : "pi pi-sliders-h",
          command : () => router.push("/vehcile/gears"),
        },
        {
          label : "Vehicle Status",
          icon : " pi pi-check-circle",
          command :()=> router.push("/vehicle/vehiclestatus"),
        },
        {
          label : " Vehicle Features",
          icon : "pi pi-list",
          command : () => router.push("/vehicle/vehiclefeatures"),
        },
        {
          label : " Vehicle Images",
          icon : "pi pi-images",
          command : () => router.push("/vehicle/vehicleimages"),
        },
      ],
    },
    // Inspection
    {
      label: "Inspection",
      icon: "pi pi-search",
      items: [
        {
          label: "Checklist Options",
          icon: "pi pi-check",
          command: () => router.push("/inspection/checklistoptions"),
        },
        {
          label: "Checklist Category",
          icon: "pi pi-list",
          command: () => router.push("/inspection/checklistcategory"),
        },
        {
          label: "Vehicle Inspection",
          icon: "pi pi-car",
          command: () => router.push("/inspection/vehicle"),
        },
      ],
    },
    // Bookings
    {
      label: "Bookings",
      icon: "pi pi-calendar",
      items: [
        {
          label: "Vehicle Bookings",
          icon: "pi pi-book",
          command: () => router.push("/bookings/vehicle"),
        },
        {
          label: "Booking Logs",
          icon: "pi pi-file",
          command: () => router.push("/bookings/logs"),
        },
      ],
    },
    // Pricing
    {
      label: "Pricing",
      icon: "pi pi-dollar",
      items : [
        {
          label : " Vehicle Bookings Prices",
          icon : "pi pi-dollar",
          command : () => router.push("/pricing/prices"),
        },
        {
          label : " Vehicle Booking Logs",
          icon : "pi pi-list",
          command : () => router.push("/pricing/logs")
        }
      ]
    },
    {
      label: "Reports",
      icon: "pi pi-chart-line",
      command: () => router.push("/reports"),
    },

    {
      label: "Support",
      icon: "pi pi-question-circle",
      command: () => router.push("/support"),
    },

    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => router.push("/settings"),
    },

    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => console.log("Logout clicked"), // handle logout later
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}
