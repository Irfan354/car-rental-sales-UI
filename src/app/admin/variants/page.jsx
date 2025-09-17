"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function Variants() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [variants, setVariants] = useState([
    { id: 1, name: "LE", model: "Camry", fuelType: "Petrol", transmission: "Automatic", status: "Active" },
    { id: 2, name: "EX", model: "Civic", fuelType: "Petrol", transmission: "Manual", status: "Active" },
    { id: 3, name: "Platinum", model: "F-150", fuelType: "Diesel", transmission: "Automatic", status: "Inactive" },
  ]);

  const [form, setForm] = useState({ 
    name: "", 
    model: "", 
    fuelType: "Petrol", 
    transmission: "Automatic", 
    status: "Active" 
  });
  const [editingVariant, setEditingVariant] = useState(null);

  const models = ["Camry", "Civic", "F-150", "Corolla", "Accord"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Automatic", "Manual", "CVT"];

  // Counts
  const totalVariants = variants.length;
  const activeVariants = variants.filter((v) => v.status === "Active").length;
  const inactiveVariants = variants.filter((v) => v.status === "Inactive").length;

  // Add variant
  const handleAddVariant = () => {
    if (!form.name.trim() || !form.model.trim()) {
      alert("Variant name and model are required!");
      return;
    }
    setVariants([...variants, { id: variants.length + 1, ...form }]);
    setForm({ name: "", model: "", fuelType: "Petrol", transmission: "Automatic", status: "Active" });
    setVisible(false);
  };

  // Edit variant
  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setForm({ ...variant });
    setEditVisible(true);
  };

  // Save edited variant
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.model.trim()) {
      alert("Variant name and model are required!");
      return;
    }
    
    const updatedVariants = variants.map(variant => 
      variant.id === editingVariant.id ? { ...form } : variant
    );
    
    setVariants(updatedVariants);
    setEditVisible(false);
    setForm({ name: "", model: "", fuelType: "Petrol", transmission: "Automatic", status: "Active" });
    setEditingVariant(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditVariant(rowData)}
          tooltip="Edit Variant"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Variants</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Car Variants</h1>
          <Button
            icon="pi pi-plus"
            label="Add Variant"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeVariants} Active</span>
          <span>✖ {inactiveVariants} Inactive</span>
          <span>📋 {totalVariants} Total Variants</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={variants} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Variant Name" />
          <Column field="model" header="Model" />
          <Column field="fuelType" header="Fuel Type" />
          <Column field="transmission" header="Transmission" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add Variant Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add Variant</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Variant Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.model} 
              options={models} 
              onChange={(e) => setForm({ ...form, model: e.value })} 
            />
            <label>Model</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.fuelType} 
              options={fuelTypes} 
              onChange={(e) => setForm({ ...form, fuelType: e.value })} 
            />
            <label>Fuel Type</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.transmission} 
              options={transmissions} 
              onChange={(e) => setForm({ ...form, transmission: e.value })} 
            />
            <label>Transmission</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddVariant} />
        </div>
      </Sidebar>

      {/* Edit Variant Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Variant</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Variant Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.model} 
              options={models} 
              onChange={(e) => setForm({ ...form, model: e.value })} 
            />
            <label>Model</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.fuelType} 
              options={fuelTypes} 
              onChange={(e) => setForm({ ...form, fuelType: e.value })} 
            />
            <label>Fuel Type</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.transmission} 
              options={transmissions} 
              onChange={(e) => setForm({ ...form, transmission: e.value })} 
            />
            <label>Transmission</label>
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