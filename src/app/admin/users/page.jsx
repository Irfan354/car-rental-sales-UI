'use client'
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core
import "primeicons/primeicons.css"; // icons

export default function Users() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ]);

  const [form, setForm] = useState({ name: "", email: "", status: "Active" });

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...form }]);
    setForm({ name: "", email: "", status: "Active" });
    setVisible(false);
  };

  return (
    <div className="p-10 flex flex-col gap-6">
      {/* Header Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Breadcrumb */}
        <nav className="text-gray-500 mb-8 text-sm">
          <span className="mr-2">🏠 Home</span> &gt;
          <span className="mx-2"> Admin </span> &gt;
          <span className="text-black"> Users </span>
        </nav>

        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Users</h1>
          <Button
            icon="pi pi-user-plus"
            label="Add User"
            className="bg-purple-600 hover:bg-purple-700 border-none"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      {/* DataTable Card */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataTable value={users} paginator rows={5} className="shadow-sm">
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="email" header="Email" />
          <Column field="status" header="Status" />
        </DataTable>
      </div>

      {/* Sidebar Form */}
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <div className="flex flex-col gap-4">
          <span className="p-float-label">
            <InputText
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full"
            />
            <label htmlFor="name">Name</label>
          </span>

          <span className="p-float-label">
            <InputText
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full"
            />
            <label htmlFor="email">Email</label>
          </span>

          <span className="p-float-label">
            <InputText
              id="status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full"
            />
            <label htmlFor="status">Status</label>
          </span>

          <Button
            label="Save"
            icon="pi pi-check"
            className="bg-purple-600 border-none hover:bg-purple-700"
            onClick={handleAddUser}
          />
        </div>
      </Sidebar>
    </div>
  );
}
