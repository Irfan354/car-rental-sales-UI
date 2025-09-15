"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function Cities() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [cities, setCities] = useState([
    { id: 1, name: "Los Angeles", state: "California", stateCode: "CA", zipCode: "90001", status: "Active" },
    { id: 2, name: "San Francisco", state: "California", stateCode: "CA", zipCode: "94102", status: "Active" },
    { id: 3, name: "Houston", state: "Texas", stateCode: "TX", zipCode: "77001", status: "Active" },
    { id: 4, name: "Miami", state: "Florida", stateCode: "FL", zipCode: "33101", status: "Inactive" },
  ]);

  const [form, setForm] = useState({ 
    name: "", 
    state: "", 
    stateCode: "", 
    zipCode: "", 
    status: "Active" 
  });
  const [editingCity, setEditingCity] = useState(null);

  // Available states for dropdown
  const states = [
    { name: "California", code: "CA" },
    { name: "Texas", code: "TX" },
    { name: "New York", code: "NY" },
    { name: "Florida", code: "FL" },
    { name: "Illinois", code: "IL" }
  ];

  // Counts
  const totalCities = cities.length;
  const activeCities = cities.filter((c) => c.status === "Active").length;
  const inactiveCities = cities.filter((c) => c.status === "Inactive").length;

  // Add city
  const handleAddCity = () => {
    if (!form.name.trim() || !form.state.trim() || !form.zipCode.trim()) {
      alert("City name, state, and zip code are required!");
      return;
    }
    setCities([...cities, { id: cities.length + 1, ...form }]);
    setForm({ name: "", state: "", stateCode: "", zipCode: "", status: "Active" });
    setVisible(false);
  };

  // Edit city
  const handleEditCity = (city) => {
    setEditingCity(city);
    setForm({ ...city });
    setEditVisible(true);
  };

  // Handle state selection - automatically set state code
  const handleStateChange = (selectedState) => {
    const stateObj = states.find(s => s.name === selectedState);
    setForm({
      ...form,
      state: selectedState,
      stateCode: stateObj ? stateObj.code : ""
    });
  };

  // Save edited city
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.state.trim() || !form.zipCode.trim()) {
      alert("City name, state, and zip code are required!");
      return;
    }
    
    const updatedCities = cities.map(city => 
      city.id === editingCity.id ? { ...form } : city
    );
    
    setCities(updatedCities);
    setEditVisible(false);
    setForm({ name: "", state: "", stateCode: "", zipCode: "", status: "Active" });
    setEditingCity(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditCity(rowData)}
          tooltip="Edit City"
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-text p-button-danger" 
          onClick={() => {
            if (confirm('Are you sure you want to delete this city?')) {
              setCities(cities.filter(city => city.id !== rowData.id));
            }
          }}
          tooltip="Delete City"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Cities</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Cities</h1>
          <Button
            icon="pi pi-plus"
            label="Add City"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeCities} Active</span>
          <span>✖ {inactiveCities} Inactive</span>
          <span>📋 {totalCities} Total Cities</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={cities} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="City Name" />
          <Column field="state" header="State" />
          <Column field="stateCode" header="State Code" />
          <Column field="zipCode" header="Zip Code" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add City Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add City</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>City Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.state} 
              options={states.map(s => s.name)} 
              onChange={(e) => handleStateChange(e.value)} 
              placeholder="Select a State"
            />
            <label>State</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.stateCode} 
              onChange={(e) => setForm({ ...form, stateCode: e.target.value.toUpperCase() })} 
              maxLength={2}
              disabled
            />
            <label>State Code (Auto-filled)</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.zipCode} 
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })} 
              placeholder="e.g., 90001"
            />
            <label>Zip Code</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddCity} />
        </div>
      </Sidebar>

      {/* Edit City Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit City</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>City Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.state} 
              options={states.map(s => s.name)} 
              onChange={(e) => handleStateChange(e.value)} 
              placeholder="Select a State"
            />
            <label>State</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.stateCode} 
              onChange={(e) => setForm({ ...form, stateCode: e.target.value.toUpperCase() })} 
              maxLength={2}
              disabled
            />
            <label>State Code</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.zipCode} 
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })} 
              placeholder="e.g., 90001"
            />
            <label>Zip Code</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save Changes" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleSaveEdit} />
        </div>
      </Sidebar>
    </div>
  );
}