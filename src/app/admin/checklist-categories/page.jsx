"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function ChecklistCategories() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: "Exterior Inspection", description: "Check exterior parts of the vehicle", status: "Active", vehicleType: "All" },
    { id: 2, name: "Interior Inspection", description: "Check interior components", status: "Active", vehicleType: "All" },
    { id: 3, name: "Mechanical Check", description: "Engine and mechanical systems", status: "Active", vehicleType: "Car" },
    { id: 4, name: "Document Verification", description: "Check all required documents", status: "Inactive", vehicleType: "All" },
  ]);

  const [form, setForm] = useState({ 
    name: "", 
    description: "", 
    vehicleType: "All", 
    status: "Active" 
  });
  const [editingCategory, setEditingCategory] = useState(null);

  const vehicleTypes = ["All", "Car", "SUV", "Truck", "Motorcycle", "Van"];

  // Counts
  const totalCategories = categories.length;
  const activeCategories = categories.filter((c) => c.status === "Active").length;
  const inactiveCategories = categories.filter((c) => c.status === "Inactive").length;

  // Add category
  const handleAddCategory = () => {
    if (!form.name.trim()) {
      alert("Category name is required!");
      return;
    }
    setCategories([...categories, { id: categories.length + 1, ...form }]);
    setForm({ name: "", description: "", vehicleType: "All", status: "Active" });
    setVisible(false);
  };

  // Edit category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setForm({ ...category });
    setEditVisible(true);
  };

  // Save edited category
  const handleSaveEdit = () => {
    if (!form.name.trim()) {
      alert("Category name is required!");
      return;
    }
    
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? { ...form } : category
    );
    
    setCategories(updatedCategories);
    setEditVisible(false);
    setForm({ name: "", description: "", vehicleType: "All", status: "Active" });
    setEditingCategory(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditCategory(rowData)}
          tooltip="Edit Category"
        />
      </div>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Checklist Categories</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Checklist Categories</h1>
          <Button
            icon="pi pi-plus"
            label="Add Category"
            className="bg-purple-600 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeCategories} Active</span>
          <span>✖ {inactiveCategories} Inactive</span>
          <span>📋 {totalCategories} Total Categories</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={categories} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Category Name" />
          <Column field="description" header="Description" />
          <Column field="vehicleType" header="Vehicle Type" />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "160px" }} />
        </DataTable>
      </div>

      {/* Add Category Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add Checklist Category</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Category Name</label>
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
              value={form.vehicleType} 
              options={vehicleTypes} 
              onChange={(e) => setForm({ ...form, vehicleType: e.value })} 
            />
            <label>Vehicle Type</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddCategory} />
        </div>
      </Sidebar>

      {/* Edit Category Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Checklist Category</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Category Name</label>
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
              value={form.vehicleType} 
              options={vehicleTypes} 
              onChange={(e) => setForm({ ...form, vehicleType: e.value })} 
            />
            <label>Vehicle Type</label>
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