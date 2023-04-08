import React from "react";

import { Button } from "antd";
import { useDeleteUserMutation } from "../../redux/features/users/adminManagement";
import { useSelector } from "react-redux";

function UserManagement() {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const adminID = useSelector((state) => state.auth.user);

  const handleUserDelete = (userID) => {
    console.log(userID, adminID);
    deleteUser({ user_id: userID, adminID: adminID });
  };

  return (
    <>
      <div className="overflow-auto rounded-lg shadow md:block">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                ID
              </th>

              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                User name
              </th>
              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                Admin Level
              </th>
              <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide">
                User mail
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
                    handleUserDelete("admin.adminID");
                  }}
                  loading={isLoading}
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
    </>
  );
}

export default UserManagement;
