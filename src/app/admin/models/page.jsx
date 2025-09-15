"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function Models() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [models, setModels] = useState([
    { id: 1, name: "Camry", brand: "Toyota", status: "Active", year: "2024" },
    { id: 2, name: "Civic", brand: "Honda", status: "Active", year: "2024" },
    { id: 3, name: "F-150", brand: "Ford", status: "Inactive", year: "2023" },
  ]);

  const [form, setForm] = useState({ name: "", brand: "", year: "", status: "Active" });
  const [editingModel, setEditingModel] = useState(null);

  const brands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];

  // Counts
  const totalModels = models.length;
  const activeModels = models.filter((m) => m.status === "Active").length;
  const inactiveModels = models.filter((m) => m.status === "Inactive").length;

  // Add model
  const handleAddModel = () => {
    if (!form.name.trim() || !form.brand.trim()) {
      alert("Model name and brand are required!");
      return;
    }
    setModels([...models, { id: models.length + 1, ...form }]);
    setForm({ name: "", brand: "", year: "", status: "Active" });
    setVisible(false);
  };

  // Edit model
  const handleEditModel = (model) => {
    setEditingModel(model);
    setForm({ ...model });
    setEditVisible(true);
  };

  // Save edited model
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.brand.trim()) {
      alert("Model name and brand are required!");
      return;
    }
    
    const updatedModels = models.map(model => 
      model.id === editingModel.id ? { ...form } : model
    );
    
    setModels(updatedModels);
    setEditVisible(false);
    setForm({ name: "", brand: "", year: "", status: "Active" });
    setEditingModel(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditModel(rowData)}
          tooltip="Edit Model"
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-text p-button-danger" 
          onClick={() => {/* Add delete logic */}}
          tooltip="Delete Model"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Models</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Car Models</h1>
          <Button
            icon="pi pi-plus"
            label="Add Model"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeModels} Active</span>
          <span>✖ {inactiveModels} Inactive</span>
          <span>📋 {totalModels} Total Models</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={models} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Model Name" />
          <Column field="brand" header="Brand" />
          <Column field="year" header="Year" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add Model Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add Model</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Model Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.brand} 
              options={brands} 
              onChange={(e) => setForm({ ...form, brand: e.value })} 
            />
            <label>Brand</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.year} 
              onChange={(e) => setForm({ ...form, year: e.target.value })} 
            />
            <label>Year</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddModel} />
        </div>
      </Sidebar>

      {/* Edit Model Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Model</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Model Name</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.brand} 
              options={brands} 
              onChange={(e) => setForm({ ...form, brand: e.value })} 
            />
            <label>Brand</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.year} 
              onChange={(e) => setForm({ ...form, year: e.target.value })} 
            />
            <label>Year</label>
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