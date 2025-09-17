"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Badge } from "primereact/badge";

export default function VehicleBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingId: "BK20240115001",
      customer: "John Doe",
      customerPhone: "+1-555-0123",
      vehicle: "Toyota Camry",
      model: "2023 SE",
      regNumber: "ABC123",
      vin: "1HGCM82633A123456",
      pickupDate: "2024-01-15",
      returnDate: "2024-01-20",
      pickupLocation: "Downtown Branch",
      returnLocation: "Airport Branch",
      status: "Confirmed",
      totalAmount: "$350",
      paymentStatus: "Paid",
      bookingDate: "2024-01-10"
    },
    {
      id: 2,
      bookingId: "BK20240116002",
      customer: "Jane Smith",
      customerPhone: "+1-555-0456",
      vehicle: "Honda Civic",
      model: "2024 LX",
      regNumber: "XYZ789",
      vin: "2HGFG21598H765432",
      pickupDate: "2024-01-16",
      returnDate: "2024-01-18",
      pickupLocation: "Airport Branch",
      returnLocation: "Airport Branch",
      status: "Pending",
      totalAmount: "$220",
      paymentStatus: "Pending",
      bookingDate: "2024-01-11"
    },
    {
      id: 3,
      bookingId: "BK20240117003",
      customer: "Mike Johnson",
      customerPhone: "+1-555-0789",
      vehicle: "Ford F-150",
      model: "2023 XLT",
      regNumber: "TRK456",
      vin: "1FTFW1ET0PFA98765",
      pickupDate: "2024-01-17",
      returnDate: "2024-01-22",
      pickupLocation: "City Center",
      returnLocation: "Downtown Branch",
      status: "Active",
      totalAmount: "$480",
      paymentStatus: "Paid",
      bookingDate: "2024-01-12"
    },
    {
      id: 4,
      bookingId: "BK20240118004",
      customer: "Sarah Wilson",
      customerPhone: "+1-555-0321",
      vehicle: "BMW X5",
      model: "2024 xDrive40i",
      regNumber: "BMW007",
      vin: "5UXCR6C06P9A12345",
      pickupDate: "2024-01-18",
      returnDate: "2024-01-25",
      pickupLocation: "Downtown Branch",
      returnLocation: "Downtown Branch",
      status: "Cancelled",
      totalAmount: "$700",
      paymentStatus: "Refunded",
      bookingDate: "2024-01-13"
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [globalFilter, setGlobalFilter] = useState("");

  const statusOptions = [
    "All", "Pending", "Confirmed", "Active", "Completed", "Cancelled"
  ];

  const statusBodyTemplate = (rowData) => {
    const getStatusSeverity = (status) => {
      switch (status) {
        case 'Confirmed': return 'success';
        case 'Active': return 'info';
        case 'Pending': return 'warning';
        case 'Completed': return 'help';
        case 'Cancelled': return 'danger';
        default: return null;
      }
    };

    return (
      <Badge value={rowData.status} severity={getStatusSeverity(rowData.status)} />
    );
  };

  const paymentStatusBodyTemplate = (rowData) => {
    return (
      <span className={`font-semibold ${
        rowData.paymentStatus === 'Paid' ? 'text-green-600' : 
        rowData.paymentStatus === 'Pending' ? 'text-orange-600' : 
        'text-red-600'
      }`}>
        {rowData.paymentStatus}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          className="p-button-text p-button-info"
          onClick={() => {
            setSelectedBooking(rowData);
            setDetailDialog(true);
          }}
          tooltip="View Details"
        />
        <Button
          icon="pi pi-cog"
          className="p-button-text p-button-warning"
          onClick={() => handleStatusChange(rowData)}
          tooltip="Change Status"
        />
      </div>
    );
  };

  const handleStatusChange = (booking) => {
    const newStatus = prompt(`Change status for booking ${booking.bookingId}:\n(Confirmed, Active, Completed, Cancelled)`);
    if (newStatus && ['Confirmed', 'Active', 'Completed', 'Cancelled'].includes(newStatus)) {
      setBookings(prev => prev.map(b => 
        b.id === booking.id ? { ...b, status: newStatus } : b
      ));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    const matchesSearch = globalFilter === "" || 
      Object.values(booking).some(value => 
        value.toString().toLowerCase().includes(globalFilter.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Bookings</span> &gt; 
          <span className="text-black"> Vehicle Bookings</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Vehicle Bookings</h1>
          <div className="flex gap-4">
            <span className="p-input-icon-left">
              <InputText
                placeholder="Search bookings..."
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
          <span>📋 {bookings.length} Total Bookings</span>
          <span>🟡 {bookings.filter(b => b.status === 'Pending').length} Pending</span>
          <span>🟢 {bookings.filter(b => b.status === 'Confirmed').length} Confirmed</span>
          <span>🔵 {bookings.filter(b => b.status === 'Active').length} Active</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={filteredBookings} paginator rows={10} dataKey="id">
          <Column field="bookingId" header="Booking ID" sortable />
          <Column field="customer" header="Customer" sortable />
          <Column field="vehicle" header="Vehicle" sortable />
          <Column field="regNumber" header="Reg Number" sortable />
          <Column field="pickupDate" header="Pickup Date" sortable />
          <Column field="returnDate" header="Return Date" sortable />
          <Column field="status" header="Status" body={statusBodyTemplate} sortable />
          <Column field="totalAmount" header="Amount" sortable />
          <Column field="paymentStatus" header="Payment" body={paymentStatusBodyTemplate} sortable />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: '120px' }} />
        </DataTable>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog
        header={`Booking Details - ${selectedBooking?.bookingId}`}
        visible={detailDialog}
        onHide={() => setDetailDialog(false)}
        className="w-11/12 max-w-4xl"
      >
        {selectedBooking && (
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Booking Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Booking ID</label>
                <p className="font-semibold text-blue-600">{selectedBooking.bookingId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Booking Date</label>
                <p>{selectedBooking.bookingDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Customer</label>
                <p>{selectedBooking.customer}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <p>{selectedBooking.customerPhone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Vehicle Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Vehicle</label>
                <p>{selectedBooking.vehicle} {selectedBooking.model}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Registration Number</label>
                <p className="font-mono font-semibold">{selectedBooking.regNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">VIN</label>
                <p className="font-mono text-sm">{selectedBooking.vin}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Rental Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Pickup Date</label>
                <p>{selectedBooking.pickupDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Return Date</label>
                <p>{selectedBooking.returnDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Pickup Location</label>
                <p>{selectedBooking.pickupLocation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Return Location</label>
                <p>{selectedBooking.returnLocation}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Payment & Status</h3>
              <div>
                <label className="block text-sm font-medium text-gray-600">Total Amount</label>
                <p className="text-xl font-bold text-green-600">{selectedBooking.totalAmount}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Payment Status</label>
                <span className={`font-semibold ${
                  selectedBooking.paymentStatus === 'Paid' ? 'text-green-600' : 
                  selectedBooking.paymentStatus === 'Pending' ? 'text-orange-600' : 
                  'text-red-600'
                }`}>
                  {selectedBooking.paymentStatus}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Booking Status</label>
                <Badge value={selectedBooking.status} severity={
                  selectedBooking.status === 'Confirmed' ? 'success' :
                  selectedBooking.status === 'Active' ? 'info' :
                  selectedBooking.status === 'Pending' ? 'warning' : 'danger'
                } />
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}