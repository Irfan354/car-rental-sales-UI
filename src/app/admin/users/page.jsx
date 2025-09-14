  "use client";
  import { useState, useEffect } from "react";
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
    const [users, setUsers] = useState([
      { id: 1, name: "Ali Rahman", email: "ali@example.com", role: "ADMIN", status: "Active" },
      { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "HOSTER", status: "Inactive" },
      { id: 3, name: "Omar Khalid", email: "omar@example.com", role: "CUSTOMER", status: "Active" },
    ]);

    const [form, setForm] = useState({ name: "", email: "", role: "CUSTOMER", status: "Active" });
    const [editingRows, setEditingRows] = useState({});

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
      setForm({ name: "", email: "", role: "CUSTOMER", status: "Active" });
      setVisible(false);
    };

    // Save row edits
    const onRowEditComplete = (e) => {
      let _users = [...users];
      let { newData, index } = e;
      _users[index] = newData;
      setUsers(_users);
    };

    // Editor for text fields
    const textEditor = (options) => {
      return (
        <InputText
          value={options.value}
          onChange={(e) => options.editorCallback(e.target.value)}
        />
      );
    };

    // Editor for status dropdown
    const statusEditor = (options) => {
      const statuses = ["Active", "Inactive"];
      return (
        <Dropdown
          value={options.value}
          options={statuses}
          onChange={(e) => options.editorCallback(e.value)}
          className="w-full"
        />
      );
    };

    // Custom actions column → show pencil only for ADMIN
    const actionTemplate = (rowData) => {
      if (rowData.role === "ADMIN") {
        return <Column rowEditor header="Actions" />;
      }
      return null; // No pencil for Hoster/Customer
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
            <Button
              icon="pi pi-user-plus"
              label="Add User"
              className="bg-purple-600 border-none"
              onClick={() => setVisible(true)}
            />
          </div>
          <div className="flex gap-6 mt-4 text-gray-700">
            <span>✔ {activeUsers} Active</span>
            <span>✖ {inactiveUsers} Inactive</span>
            <span>📋 {totalUsers} Total Users</span>
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <DataTable
            value={users}
            paginator
            rows={5}
            editMode="row"
            dataKey="id"
            onRowEditComplete={onRowEditComplete}
            editingRows={editingRows}
            onRowEditChange={(e) => setEditingRows(e.value)}
          >
            <Column field="id" header="ID" style={{ width: "60px" }} />
            <Column field="name" header="Name" editor={textEditor} />
            <Column field="email" header="Email" editor={textEditor} />
            <Column field="role" header="Role" /> {/* Not editable */}
            <Column field="status" header="Status" editor={statusEditor} />

            {/* Custom action column */}
            <Column
              body={(rowData) =>
                rowData.role === "ADMIN" ? (
                  <span className="pi pi-pencil text-purple-600 cursor-pointer" />
                ) : (
                  ""
                )
              }
              header="Actions"
              style={{ textAlign: "center", width: "120px" }}
            />
          </DataTable>
        </div>

        {/* Sidebar */}
        <Sidebar visible={visible} position="right" onHide={() => setVisible(false)} className="w-96">
          <h2 className="text-xl font-semibold mb-4">Add User</h2>
          <div className="flex flex-col gap-4">
            <span className="p-float-label">
              <InputText value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <label>Name</label>
            </span>
            <span className="p-float-label">
              <InputText value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <label>Email</label>
            </span>
            <span className="p-float-label">
              <Dropdown value={form.role} options={["ADMIN", "HOSTER", "CUSTOMER"]} onChange={(e) => setForm({ ...form, role: e.value })} />
              <label>Role</label>
            </span>
            <span className="p-float-label">
              <Dropdown value={form.status} options={["Active", "Inactive"]} onChange={(e) => setForm({ ...form, status: e.value })} />
              <label>Status</label>
            </span>
            <Button label="Save" icon="pi pi-check" className="bg-purple-600 border-none" onClick={handleAddUser} />
          </div>
        </Sidebar>
      </div>
    );
  }
