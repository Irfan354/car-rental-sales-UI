"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Rating } from "primereact/rating";

export default function AvailableVehicles() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      regNumber: "ABC123",
      vehicle: "Toyota Camry 2023",
      hoster: "Ali Rahman",
      hosterPhone: "+1-555-0123",
      inspectionDate: "2024-01-12",
      inspector: "John Inspector",
      inspectionScore: 4.8,
      status: "Available",
      dailyRate: "$45",
      location: "Downtown",
      vehicleType: "Sedan",
      fuelType: "Petrol",
      mileage: "12,000 km",
      features: ["AC", "Bluetooth", "GPS", "Backup Camera"]
    },
    {
      id: 2,
      regNumber: "SUV456",
      vehicle: "Honda CR-V 2024",
      hoster: "Omar Khalid",
      hosterPhone: "+1-555-0456",
      inspectionDate: "2024-01-14",
      inspector: "Sarah Inspector",
      inspectionScore: 4.9,
      status: "Available",
      dailyRate: "$55",
      location: "Airport Area",
      vehicleType: "SUV",
      fuelType: "Petrol",
      mileage: "8,000 km",
      features: ["AC", "Sunroof", "Leather Seats", "Apple CarPlay"]
    },
    {
      id: 3,
      regNumber: "LUX789",
      vehicle: "Mercedes C-Class 2023",
      hoster: "Sarah Wilson",
      hosterPhone: "+1-555-0789",
      inspectionDate: "2024-01-13",
      inspector: "Mike Inspector",
      inspectionScore: 4.7,
      status: "Rented",
      dailyRate: "$85",
      location: "City Center",
      vehicleType: "Luxury",
      fuelType: "Petrol",
      mileage: "15,000 km",
      features: ["Premium Sound", "Heated Seats", "Navigation", "Parking Assist"]
    },
    {
      id: 4,
      regNumber: "TRK012",
      vehicle: "Ford Ranger 2023",
      hoster: "Mike Johnson",
      hosterPhone: "+1-555-0321",
      inspectionDate: "2024-01-15",
      inspector: "Emily Inspector",
      inspectionScore: 4.6,
      status: "Available",
      dailyRate: "$60",
      location: "Suburban",
      vehicleType: "Truck",
      fuelType: "Diesel",
      mileage: "18,000 km",
      features: ["4x4", "Towing Package", "Bed Liner", "Touchscreen"]
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");

  const statusOptions = ["All", "Available", "Rented", "Maintenance"];
  const typeOptions = ["All", "Sedan", "SUV", "Truck", "Luxury", "Van"];

  const statusBodyTemplate = (rowData) => {
    const getStatusSeverity = (status) => {
      switch (status) {
        case 'Available': return 'success';
        case 'Rented': return 'info';
        case 'Maintenance': return 'warning';
        default: return null;
      }
    };

    return (
      <Badge value={rowData.status} severity={getStatusSeverity(rowData.status)} />
    );
  };

  const scoreBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Rating value={rowData.inspectionScore} readOnly cancel={false} />
        <span className="text-sm text-gray-600">({rowData.inspectionScore})</span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-text p-button-info"
          onClick={() => {
            setSelectedVehicle(rowData);
            setDetailDialog(true);
          }}
          tooltip="View Details"
        />
        <Button
          icon="pi pi-file-pdf"
          className="p-button-text p-button-danger"
          onClick={() => downloadInspectionReport(rowData)}
          tooltip="Download Report"
        />
        {rowData.status === "Available" && (
          <Button
            icon="pi pi-car"
            className="p-button-text p-button-success"
            onClick={() => bookVehicle(rowData)}
            tooltip="Book Vehicle"
          />
        )}
      </div>
    );
  };

  const downloadInspectionReport = (vehicle) => {
    alert(`Downloading inspection report for ${vehicle.regNumber}`);
  };

  const bookVehicle = (vehicle) => {
    alert(`Booking vehicle: ${vehicle.vehicle} (${vehicle.regNumber})`);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = statusFilter === "All" || vehicle.status === statusFilter;
    const matchesType = typeFilter === "All" || vehicle.vehicleType === typeFilter;
    const matchesSearch = globalFilter === "" || 
      Object.values(vehicle).some(value => 
        value && value.toString().toLowerCase().includes(globalFilter.toLowerCase())
      );
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; 
          <span className="text-black"> Available Vehicles</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Available Vehicles</h1>
          <div className="flex gap-4">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Search vehicles..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-64"
              />
            </span>
            <Dropdown
              value={statusFilter}
              options={statusOptions}
              onChange={(e) => setStatusFilter(e.value)}
              placeholder="Status"
              className="w-32"
            />
            <Dropdown
              value={typeFilter}
              options={typeOptions}
              onChange={(e) => setTypeFilter(e.value)}
              placeholder="Type"
              className="w-32"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>🚗 {vehicles.filter(v => v.status === 'Available').length} Available</span>
          <span>📊 {vehicles.filter(v => v.status === 'Rented').length} Rented</span>
          <span>⭐ {vehicles.reduce((acc, v) => acc + v.inspectionScore, 0) / vehicles.length} Avg Rating</span>
          <span>💰 ${vehicles.filter(v => v.status === 'Available').reduce((acc, v) => acc + parseInt(v.dailyRate.replace('$', '')), 0)} Total Daily Value</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={filteredVehicles} paginator rows={10} dataKey="id">
          <Column field="regNumber" header="Reg Number" sortable />
          <Column field="vehicle" header="Vehicle" sortable />
          <Column field="vehicleType" header="Type" sortable />
          <Column field="hoster" header="Hoster" sortable />
          <Column field="dailyRate" header="Daily Rate" sortable />
          <Column field="inspectionScore" header="Inspection Score" body={scoreBodyTemplate} sortable />
          <Column field="inspectionDate" header="Inspected On" sortable />
          <Column field="status" header="Status" body={statusBodyTemplate} sortable />
          <Column field="location" header="Location" sortable />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: '180px' }} />
        </DataTable>
      </div>

      {/* Vehicle Detail Dialog */}
      <Dialog
        header={`Vehicle Details - ${selectedVehicle?.regNumber}`}
        visible={detailDialog}
        onHide={() => setDetailDialog(false)}
        className="w-11/12 max-w-4xl"
      >
        {selectedVehicle && (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Vehicle Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Registration Number</label>
                <p className="font-mono font-semibold text-blue-600">{selectedVehicle.regNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Vehicle</label>
                <p>{selectedVehicle.vehicle}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Type</label>
                <Badge value={selectedVehicle.vehicleType} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                <p>{selectedVehicle.fuelType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Mileage</label>
                <p>{selectedVehicle.mileage}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Hoster Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Hoster Name</label>
                <p>{selectedVehicle.hoster}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <p>{selectedVehicle.hosterPhone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Location</label>
                <p>{selectedVehicle.location}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Inspection Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Inspection Date</label>
                <p>{selectedVehicle.inspectionDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Inspector</label>
                <p>{selectedVehicle.inspector}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Inspection Score</label>
                <Rating value={selectedVehicle.inspectionScore} readOnly cancel={false} />
                <span className="text-sm text-gray-600 ml-2">({selectedVehicle.inspectionScore}/5)</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Rental Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Daily Rate</label>
                <p className="text-xl font-bold text-green-600">{selectedVehicle.dailyRate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <Badge value={selectedVehicle.status} severity={
                  selectedVehicle.status === 'Available' ? 'success' :
                  selectedVehicle.status === 'Rented' ? 'info' : 'warning'
                } />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Features</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedVehicle.features.map((feature, index) => (
                    <Badge key={index} value={feature} severity="info" className="text-xs" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}