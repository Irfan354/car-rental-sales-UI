"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function States() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [states, setStates] = useState([
    { id: 1, name: "California", code: "CA", country: "USA", status: "Active" },
    { id: 2, name: "Texas", code: "TX", country: "USA", status: "Active" },
    { id: 3, name: "New York", code: "NY", country: "USA", status: "Active" },
    { id: 4, name: "Florida", code: "FL", country: "USA", status: "Inactive" },
  ]);

  const [form, setForm] = useState({ name: "", code: "", country: "USA", status: "Active" });
  const [editingState, setEditingState] = useState(null);

  // Counts
  const totalStates = states.length;
  const activeStates = states.filter((s) => s.status === "Active").length;
  const inactiveStates = states.filter((s) => s.status === "Inactive").length;

  // Add state
  const handleAddState = () => {
    if (!form.name.trim() || !form.code.trim()) {
      alert("State name and code are required!");
      return;
    }
    setStates([...states, { id: states.length + 1, ...form }]);
    setForm({ name: "", code: "", country: "USA", status: "Active" });
    setVisible(false);
  };

  // Edit state
  const handleEditState = (state) => {
    setEditingState(state);
    setForm({ ...state });
    setEditVisible(true);
  };

  // Save edited state
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.code.trim()) {
      alert("State name and code are required!");
      return;
    }
    
    const updatedStates = states.map(state => 
      state.id === editingState.id ? { ...form } : state
    );
    
    setStates(updatedStates);
    setEditVisible(false);
    setForm({ name: "", code: "", country: "USA", status: "Active" });
    setEditingState(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditState(rowData)}
          tooltip="Edit State"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">States</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">States</h1>
          <Button
            icon="pi pi-plus"
            label="Add State"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeStates} Active</span>
          <span>✖ {inactiveStates} Inactive</span>
          <span>📋 {totalStates} Total States</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={states} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="State Name" />
          <Column field="code" header="State Code" />
          <Column field="country" header="Country" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add State Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add State</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>State Name</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.code} 
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} 
              maxLength={2}
            />
            <label>State Code (e.g., CA)</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.country} 
              onChange={(e) => setForm({ ...form, country: e.target.value })} 
            />
            <label>Country</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddState} />
        </div>
      </Sidebar>

      {/* Edit State Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit State</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>State Name</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.code} 
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} 
              maxLength={2}
            />
            <label>State Code</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.country} 
              onChange={(e) => setForm({ ...form, country: e.target.value })} 
            />
            <label>Country</label>
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