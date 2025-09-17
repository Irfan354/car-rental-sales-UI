"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Calendar } from "primereact/calendar";

export default function PendingVehicles() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      regNumber: "XYZ789",
      vehicle: "Honda Civic 2024",
      hoster: "Sarah Ahmed",
      hosterPhone: "+1-555-0456",
      submittedDate: "2024-01-15",
      inspectionStatus: "Pending",
      location: "Downtown",
      vehicleType: "Sedan",
      fuelType: "Petrol",
      mileage: "15,000 km"
    },
    {
      id: 2,
      regNumber: "TRK456",
      vehicle: "Ford F-150 2023",
      hoster: "Mike Johnson",
      hosterPhone: "+1-555-0789",
      submittedDate: "2024-01-16",
      inspectionStatus: "Scheduled",
      inspectionDate: "2024-01-18",
      location: "City Center",
      vehicleType: "Truck",
      fuelType: "Diesel",
      mileage: "25,000 km"
    },
    {
      id: 3,
      regNumber: "BMW007",
      vehicle: "BMW X5 2024",
      hoster: "David Wilson",
      hosterPhone: "+1-555-0321",
      submittedDate: "2024-01-17",
      inspectionStatus: "In Progress",
      inspector: "John Inspector",
      location: "Airport Area",
      vehicleType: "SUV",
      fuelType: "Petrol",
      mileage: "8,000 km"
    },
    {
      id: 4,
      regNumber: "NIS123",
      vehicle: "Nissan Altima 2023",
      hoster: "Lisa Brown",
      hosterPhone: "+1-555-0987",
      submittedDate: "2024-01-18",
      inspectionStatus: "Re-inspection",
      previousStatus: "Failed - Tire issues",
      location: "Suburban",
      vehicleType: "Sedan",
      fuelType: "Petrol",
      mileage: "20,000 km"
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [inspectionDialog, setInspectionDialog] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [inspector, setInspector] = useState("");

  const statusOptions = ["All", "Pending", "Scheduled", "In Progress", "Re-inspection"];
  const inspectors = ["John Inspector", "Sarah Inspector", "Mike Inspector", "Emily Inspector"];

  const statusBodyTemplate = (rowData) => {
    const getStatusSeverity = (status) => {
      switch (status) {
        case 'Scheduled': return 'info';
        case 'In Progress': return 'warning';
        case 'Re-inspection': return 'danger';
        case 'Pending': return 'secondary';
        default: return null;
      }
    };

    return (
      <Badge value={rowData.inspectionStatus} severity={getStatusSeverity(rowData.inspectionStatus)} />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-calendar"
          className="p-button-text p-button-info"
          onClick={() => {
            setSelectedVehicle(rowData);
            setScheduleDialog(true);
          }}
          tooltip="Schedule Inspection"
          disabled={rowData.inspectionStatus === "In Progress"}
        />
        <Button
          icon="pi pi-clipboard"
          className="p-button-text p-button-success"
          onClick={() => {
            setSelectedVehicle(rowData);
            setInspectionDialog(true);
          }}
          tooltip="Start Inspection"
        />
        <Button
          icon="pi pi-eye"
          className="p-button-text p-button-primary"
          onClick={() => viewVehicleDetails(rowData)}
          tooltip="View Details"
        />
      </div>
    );
  };

  const viewVehicleDetails = (vehicle) => {
    alert(`Vehicle Details:\nRegistration: ${vehicle.regNumber}\nVehicle: ${vehicle.vehicle}\nHoster: ${vehicle.hoster}`);
  };

  const scheduleInspection = () => {
    if (inspectionDate && inspector) {
      setVehicles(prev => prev.map(v => 
        v.id === selectedVehicle.id ? { 
          ...v, 
          inspectionStatus: "Scheduled",
          inspectionDate: inspectionDate.toISOString().split('T')[0],
          inspector: inspector
        } : v
      ));
      setScheduleDialog(false);
      setInspectionDate(null);
      setInspector("");
    }
  };

  const startInspection = () => {
    setVehicles(prev => prev.map(v => 
      v.id === selectedVehicle.id ? { 
        ...v, 
        inspectionStatus: "In Progress",
        inspector: "Current User" // Would be actual logged-in user
      } : v
    ));
    setInspectionDialog(false);
    // Redirect to inspection page
    window.location.href = `/admin/vehicle-inspection?vehicle=${selectedVehicle.regNumber}`;
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = statusFilter === "All" || vehicle.inspectionStatus === statusFilter;
    const matchesSearch = globalFilter === "" || 
      Object.values(vehicle).some(value => 
        value && value.toString().toLowerCase().includes(globalFilter.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; 
          <span className="text-black"> Pending Vehicles</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Pending Vehicle Inspection</h1>
          <div className="flex gap-4">
            <span className="p-input-icon-left">
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
              placeholder="Filter by Status"
              className="w-48"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>📋 {vehicles.length} Vehicles Pending</span>
          <span>⏰ {vehicles.filter(v => v.inspectionStatus === 'Scheduled').length} Scheduled</span>
          <span>🔧 {vehicles.filter(v => v.inspectionStatus === 'In Progress').length} In Progress</span>
          <span>🔄 {vehicles.filter(v => v.inspectionStatus === 'Re-inspection').length} Re-inspection</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={filteredVehicles} paginator rows={10} dataKey="id">
          <Column field="regNumber" header="Reg Number" sortable />
          <Column field="vehicle" header="Vehicle" sortable />
          <Column field="hoster" header="Hoster" sortable />
          <Column field="submittedDate" header="Submitted" sortable />
          <Column field="inspectionStatus" header="Status" body={statusBodyTemplate} sortable />
          <Column field="inspectionDate" header="Inspection Date" sortable />
          <Column field="location" header="Location" sortable />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: '180px' }} />
        </DataTable>
      </div>

      {/* Schedule Inspection Dialog */}
      <Dialog
        header={`Schedule Inspection - ${selectedVehicle?.regNumber}`}
        visible={scheduleDialog}
        onHide={() => setScheduleDialog(false)}
        className="w-96"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Inspection Date</label>
            <Calendar
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.value)}
              dateFormat="yy-mm-dd"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Assign Inspector</label>
            <Dropdown
              value={inspector}
              options={inspectors}
              onChange={(e) => setInspector(e.value)}
              placeholder="Select Inspector"
              className="w-full"
            />
          </div>
          <Button 
            label="Schedule Inspection" 
            icon="pi pi-calendar" 
            className="bg-blue-600 border-none w-full" 
            onClick={scheduleInspection}
            disabled={!inspectionDate || !inspector}
          />
        </div>
      </Dialog>

      {/* Start Inspection Dialog */}
      <Dialog
        header={`Start Inspection - ${selectedVehicle?.regNumber}`}
        visible={inspectionDialog}
        onHide={() => setInspectionDialog(false)}
        className="w-96"
      >
        <div className="space-y-4">
          <p>Are you ready to start the inspection for this vehicle?</p>
          <div className="bg-gray-50 p-3 rounded-md">
            <p><strong>Vehicle:</strong> {selectedVehicle?.vehicle}</p>
            <p><strong>Registration:</strong> {selectedVehicle?.regNumber}</p>
            <p><strong>Hoster:</strong> {selectedVehicle?.hoster}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              label="Start Inspection" 
              icon="pi pi-play" 
              className="bg-green-600 border-none flex-1" 
              onClick={startInspection}
            />
            <Button 
              label="Cancel" 
              icon="pi pi-times" 
              className="p-button-text flex-1" 
              onClick={() => setInspectionDialog(false)}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}