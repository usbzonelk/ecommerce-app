import React, { useState } from "react";

import { Button } from "antd";
import UpdateAdminDetails from "./UpdateAdminDetails";
import AddNewAdmin from "./AddNewAdmin";

function AdminManageAdmins() {
  const [showPassUpdate, setShowPassUpdate] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const handleAdminDelete = (adminId) => {
    console.log(adminId);
  };
  const handleUpdateAdminDetails = () => {
    setShowPassUpdate(true);
  };
  const handleAddAdmin = () => {
    setShowAddAdmin(true);
  };

  const passModalCancel = () => {
    setShowPassUpdate(false);
    setShowAddAdmin(false);
  };

  return (
    <>
      {showPassUpdate && (
        <UpdateAdminDetails
          visible={showPassUpdate}
          onCancel={passModalCancel}
        />
      )}
      {showAddAdmin && (
        <AddNewAdmin visible={showAddAdmin} onCancel={passModalCancel} />
      )}

      <div className="overflow-auto rounded-lg shadow md:block">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                ID
              </th>

              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                Admin name
              </th>
              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                Admin Level
              </th>
              <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide">
                Admin mail
              </th>
              <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* {admins.data.map((admin) => ( */}
            <tr className="bg-white">
              <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <a href="#" className="font-bold text-blue-500 hover:underline">
                  {/* {admin.adminID} */} #id
                </a>
              </td>

              <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                {/* {admin.userName} */} adminUserName
              </td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                  {/* {admin.adminLevel } */} Lvl4
                </span>
              </td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                admin@admin.lk {/* {admin.email} */}
              </td>
              <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                <Button
                  type="text"
                  onClick={(e) => {
                    handleAdminDelete(admin.adminID);
                  }}
                >
                  {" "}
                  Delete{" "}
                </Button>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
      <Button style={{ margin: "2rem" }} type="dashed" onClick={handleAddAdmin}>
        Add a new Admin
      </Button>
      <Button
        style={{ margin: "2rem" }}
        type="link"
        onClick={handleUpdateAdminDetails}
      >
        Update your details
      </Button>
    </>
  );
}

export default AdminManageAdmins;
