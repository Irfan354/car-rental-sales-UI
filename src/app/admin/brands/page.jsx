"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function Brands() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [brands, setBrands] = useState([
    { id: 1, name: "Toyota", status: "Active", description: "Japanese automaker" },
    { id: 2, name: "Honda", status: "Active", description: "Japanese automaker" },
    { id: 3, name: "Ford", status: "Inactive", description: "American automaker" },
  ]);

  const [form, setForm] = useState({ name: "", description: "", status: "Active" });
  const [editingBrand, setEditingBrand] = useState(null);

  // Counts
  const totalBrands = brands.length;
  const activeBrands = brands.filter((b) => b.status === "Active").length;
  const inactiveBrands = brands.filter((b) => b.status === "Inactive").length;

  // Add brand
  const handleAddBrand = () => {
    if (!form.name.trim()) {
      alert("Brand name is required!");
      return;
    }
    setBrands([...brands, { id: brands.length + 1, ...form }]);
    setForm({ name: "", description: "", status: "Active" });
    setVisible(false);
  };

  // Edit brand
  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setForm({ ...brand });
    setEditVisible(true);
  };

  // Save edited brand
  const handleSaveEdit = () => {
    if (!form.name.trim()) {
      alert("Brand name is required!");
      return;
    }
    
    const updatedBrands = brands.map(brand => 
      brand.id === editingBrand.id ? { ...form } : brand
    );
    
    setBrands(updatedBrands);
    setEditVisible(false);
    setForm({ name: "", description: "", status: "Active" });
    setEditingBrand(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditBrand(rowData)}
          tooltip="Edit Brand"
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-text p-button-danger" 
          onClick={() => {/* Add delete logic */}}
          tooltip="Delete Brand"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Brands</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Car Brands</h1>
          <Button
            icon="pi pi-plus"
            label="Add Brand"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeBrands} Active</span>
          <span>✖ {inactiveBrands} Inactive</span>
          <span>📋 {totalBrands} Total Brands</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={brands} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Name" />
          <Column field="description" header="Description" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add Brand Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add Brand</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Brand Name</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
            />
            <label>Description</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddBrand} />
        </div>
      </Sidebar>

      {/* Edit Brand Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Brand</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Brand Name</label>
          </span>
          <span className="p-float-label">
            <InputText 
              value={form.description} 
              onChange={(e) => setForm({ ...form, description: e.target.value })} 
            />
            <label>Description</label>
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