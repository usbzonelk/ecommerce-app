import React, { useState } from "react";

import { Button } from "antd";
import AddProduct from "./AddProduct";
import { useGetAllItemsMutation } from "../../redux/features/products/itemApiSlice";

function ProductManagement() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [getAllItems, { data, isLoading: itemsLoading }] =
    useGetAllItemsMutation();
  const [items, setItems] = useState([]);
  try {
    getAllItems();
    setItems(data.data);
  } catch (error) {
    console.log(error);
  }
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const peoductModalCancel = () => {
    setShowAddProduct(false);
  };

  return (
    <>
      {showAddProduct && (
        <AddProduct visible={showAddProduct} onCancel={peoductModalCancel} />
      )}

      <div className="overflow-auto rounded-lg shadow md:block">
        {items.length < 1 ? (
          <h1>No products found</h1>
        ) : (
          <table className="w-full">
            <thead className="border-b-2 border-gray-200 bg-gray-50">
              <tr>
                <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                  ID
                </th>

                <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                 Price
                </th>
                <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                  Brand
                </th>
                <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide">
                  Title
                </th>
                <th className="w-32 p-3 text-left text-sm font-semibold tracking-wide"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* {admins.data.map((admin) => ( */}
              <tr className="bg-white">
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  <a
                    href="#"
                    className="font-bold text-blue-500 hover:underline"
                  >
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
                      handleAdminDelete("admin.adminID");
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
        )}
      </div>
      <Button
        style={{ margin: "2rem" }}
        type="dashed"
        onClick={handleAddProduct}
      >
        Add a new product
      </Button>
    </>
  );
}

export default ProductManagement;
