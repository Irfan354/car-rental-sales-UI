"use client";
import { useState, useEffect } from "react";
// removed useSearchParams import
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

export default function ChecklistOptions() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  // read category from URL (safe in client)
  const [categoryId, setCategoryId] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("category") || "";
  });

  // keep categoryId updated if user navigates back/forward
  useEffect(() => {
    const onPop = () => {
      setCategoryId(new URLSearchParams(window.location.search).get("category") || "");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const [options, setOptions] = useState([
    { id: 1, categoryId: 1, name: "Body Damage", description: "Check for any body damage", isRequired: true, status: "Active" },
    { id: 2, categoryId: 1, name: "Paint Condition", description: "Check paint quality", isRequired: true, status: "Active" },
    { id: 3, categoryId: 1, name: "Window Condition", description: "Check all windows", isRequired: false, status: "Active" },
    { id: 4, categoryId: 2, name: "Seat Condition", description: "Check seat quality", isRequired: true, status: "Active" },
    { id: 5, categoryId: 2, name: "Dashboard Lights", description: "Check dashboard warning lights", isRequired: false, status: "Inactive" },
  ]);

  const [categories] = useState([
    { id: 1, name: "Exterior Inspection" },
    { id: 2, name: "Interior Inspection" },
    { id: 3, name: "Mechanical Check" },
    { id: 4, name: "Document Verification" },
  ]);

  // initialize form.categoryId using numeric value (if present)
  const [form, setForm] = useState({ 
    categoryId: categoryId ? parseInt(categoryId, 10) : "", 
    name: "", 
    description: "", 
    isRequired: true, 
    status: "Active" 
  });
  const [editingOption, setEditingOption] = useState(null);

  // keep form.categoryId in sync when URL param changes
  useEffect(() => {
    setForm(prev => ({ ...prev, categoryId: categoryId ? parseInt(categoryId, 10) : "" }));
  }, [categoryId]);

  // parse categoryId for comparisons
  const categoryIdNum = categoryId ? parseInt(categoryId, 10) : null;

  // Filter options by selected category
  const filteredOptions = categoryIdNum 
    ? options.filter(option => option.categoryId === categoryIdNum)
    : options;

  const currentCategory = categories.find(cat => cat.id === categoryIdNum);

  // Counts
  const totalOptions = filteredOptions.length;
  const requiredOptions = filteredOptions.filter((o) => o.isRequired).length;
  const optionalOptions = filteredOptions.filter((o) => !o.isRequired).length;

  // Add option
  const handleAddOption = () => {
    if (!form.name.trim() || !form.categoryId) {
      alert("Option name and category are required!");
      return;
    }
    setOptions([...options, { id: options.length + 1, ...form }]);
    setForm({ categoryId: categoryId ? parseInt(categoryId, 10) : "", name: "", description: "", isRequired: true, status: "Active" });
    setVisible(false);
  };

  // Edit option
  const handleEditOption = (option) => {
    setEditingOption(option);
    setForm({ ...option });
    setEditVisible(true);
  };

  // Save edited option
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.categoryId) {
      alert("Option name and category are required!");
      return;
    }
    
    const updatedOptions = options.map(option => 
      option.id === editingOption.id ? { ...form } : option
    );
    
    setOptions(updatedOptions);
    setEditVisible(false);
    setForm({ categoryId: categoryId ? parseInt(categoryId, 10) : "", name: "", description: "", isRequired: true, status: "Active" });
    setEditingOption(null);
  };

  // Action buttons
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-primary" 
          onClick={() => handleEditOption(rowData)}
          tooltip="Edit Option"
        />
      </div>
    );
  };

  // Required badge
  const requiredBodyTemplate = (rowData) => {
    return (
      <span className={`px-2 py-1 rounded text-xs ${
        rowData.isRequired 
          ? "bg-green-100 text-green-800" 
          : "bg-gray-100 text-gray-800"
      }`}>
        {rowData.isRequired ? "Required" : "Optional"}
      </span>
    );
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; 
          <span className="mx-2">Checklist Categories</span> &gt; 
          <span className="text-black">
            {currentCategory ? currentCategory.name : "All"} Options
          </span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Checklist Options {currentCategory && `- ${currentCategory.name}`}
          </h1>
          <div className="flex gap-2">
            {!categoryId && (
              <Dropdown 
                value={form.categoryId} 
                options={categories.map(cat => ({ label: cat.name, value: cat.id }))} 
                onChange={(e) => setForm({ ...form, categoryId: e.value })}
                placeholder="Select Category"
                className="w-48"
              />
            )}
            <Button
              icon="pi pi-plus"
              label="Add Option"
              className="bg-purple-600 border-none"
              onClick={() => setVisible(true)}
              disabled={!categoryId && !form.categoryId}
            />
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>🔴 {requiredOptions} Required</span>
          <span>🔵 {optionalOptions} Optional</span>
          <span>📋 {totalOptions} Total Options</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={filteredOptions} paginator rows={5} dataKey="id">
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Option Name" />
          <Column field="description" header="Description" />
          {!categoryId && (
            <Column 
              field="categoryId" 
              header="Category" 
              body={(rowData) => {
                const category = categories.find(cat => cat.id === rowData.categoryId);
                return category ? category.name : "Unknown";
              }}
            />
          )}
          <Column field="isRequired" header="Required" body={requiredBodyTemplate} />
          <Column field="status" header="Status" />
          <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} />
        </DataTable>
      </div>

      {/* Add Option Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add Checklist Option</h2>
        <div className="flex flex-col gap-4">
          {!categoryId && (
            <span className="p-float-label">
              <Dropdown 
                value={form.categoryId} 
                options={categories.map(cat => ({ label: cat.name, value: cat.id }))} 
                onChange={(e) => setForm({ ...form, categoryId: e.value })} 
              />
              <label>Category</label>
            </span>
          )}
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Option Name</label>
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
              value={form.isRequired} 
              options={[
                { label: "Required", value: true },
                { label: "Optional", value: false }
              ]} 
              onChange={(e) => setForm({ ...form, isRequired: e.value })} 
            />
            <label>Requirement</label>
          </span>
          <span className="p-float-label">
            <Dropdown 
              value={form.status} 
              options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} 
            />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddOption} />
        </div>
      </Sidebar>

      {/* Edit Option Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Checklist Option</h2>
        <div className="flex flex-col gap-4">
          {!categoryId && (
            <span className="p-float-label">
              <Dropdown 
                value={form.categoryId} 
                options={categories.map(cat => ({ label: cat.name, value: cat.id }))} 
                onChange={(e) => setForm({ ...form, categoryId: e.value })} 
              />
              <label>Category</label>
            </span>
          )}
          <span className="p-float-label">
            <InputText 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />
            <label>Option Name</label>
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
              value={form.isRequired} 
              options={[
                { label: "Required", value: true },
                { label: "Optional", value: false }
              ]} 
              onChange={(e) => setForm({ ...form, isRequired: e.value })} 
            />
            <label>Requirement</label>
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
