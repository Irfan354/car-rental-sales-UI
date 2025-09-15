"use client";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Users() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Rahman", email: "ali@example.com", role: "ADMIN", status: "Active" },
    { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "HOSTER", status: "Inactive" },
    { id: 3, name: "Omar Khalid", email: "omar@example.com", role: "CUSTOMER", status: "Active" },
  ]);

  const [form, setForm] = useState({ id: null, name: "", email: "", role: "CUSTOMER", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);

  // Counts
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;

  // Add user
  const handleAddUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and Email are required!");
      return;
    }
    setUsers([...users, { id: users.length + 1, ...form }]);
    setForm({ id: null, name: "", email: "", role: "", status: "Active" });
    setVisible(false);
  };

  // Edit user - open sidebar with user data
  const handleEditUser = (user) => {
    if (user.role === "ADMIN") {
      setEditingUser(user);
      setForm({ ...user }); // Pre-fill form with user data
      setEditVisible(true);
    }
  };

  // Save edited user
  const handleSaveEdit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and Email are required!");
      return;
    }
    
    const updatedUsers = users.map(user => 
      user.id === editingUser.id ? { ...form } : user
    );
    
    setUsers(updatedUsers);
    setEditVisible(false);
    setForm({ id: null, name: "", email: "", role: " ", status: "Active" });
    setEditingUser(null);
  };

  // Custom actions column
  const actionBodyTemplate = (rowData) => {
    if (rowData.role === "ADMIN") {
      return (
        <Button icon="pi pi-pencil" className="p-button-text p-button-primary" 
          onClick={() => handleEditUser(rowData)} tooltip="Edit User" tooltipOptions={{ position: 'top' }} />
      );
    }
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <nav className="text-gray-500 mb-4 text-sm">
          <span>🏠 Home</span> &gt; <span className="mx-2">Admin</span> &gt; <span className="text-black">Users</span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Users</h1>
          <Button icon="pi pi-user-plus" label="Add User"
            className="bg-purple-600 border-none" onClick={() => setVisible(true)}/>
        </div>
        <div className="flex gap-6 mt-4 text-gray-700">
          <span>✔ {activeUsers} Active</span>
          <span>✖ {inactiveUsers} Inactive</span>
          <span>📋 {totalUsers} Total Users</span>
        </div>
      </div>

      {/* DataTable */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={users} paginator rows={5} dataKey="id" >
          <Column field="id" header="ID" style={{ width: "60px" }} />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column field="status" header="Status" />

          {/* Custom action column */}
          <Column body={actionBodyTemplate} header="Actions"
            style={{ textAlign: "center", width: "120px" }} exportable={false} />
        </DataTable>
      </div>

      {/* Add User Sidebar */}
      <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Name</label>
          </span>
          <span className="p-float-label">
            <InputText value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label>Email</label>
          </span>
          <span className="p-float-label">
            <Dropdown value={form.role} options={["ADMIN", "HOSTER", "CUSTOMER"]} 
              onChange={(e) => setForm({ ...form, role: e.value })} />
            <label>Role</label>
          </span>
          <span className="p-float-label">
            <Dropdown value={form.status} options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })} />
            <label>Status</label>
          </span>
          <Button label="Save" icon="pi pi-check" 
            className="bg-purple-600 border-none" onClick={handleAddUser} />
        </div>
      </Sidebar>

      {/* Edit User Sidebar */}
      <Sidebar visible={editVisible} position="right" onHide={() => setEditVisible(false)} className="w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <label>Name</label>
          </span>
          <span className="p-float-label">
            <InputText value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label>Email</label>
          </span>
          <span className="p-float-label">
            <Dropdown value={form.role} options={["ADMIN", "HOSTER", "CUSTOMER"]} 
              onChange={(e) => setForm({ ...form, role: e.value })} disabled={true} />
            <label>Role</label>
          </span>
          <span className="p-float-label">
            <Dropdown  value={form.status}  options={["Active", "Inactive"]} 
              onChange={(e) => setForm({ ...form, status: e.value })}/>
            <label>Status</label>
          </span>
          <Button label="Save Changes" icon="pi pi-check" 
            className="bg-purple-600 border-none" onClick={handleSaveEdit} />
        </div>
      </Sidebar>
    </div>
  );
}