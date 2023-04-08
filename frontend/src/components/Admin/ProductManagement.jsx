import React, { useState, useEffect } from "react";

import { Button } from "antd";
import AddProduct from "./AddProduct";
import { useGetAllItemsMutation } from "../../redux/features/products/itemApiSlice";
import { useDeleteItemMutation } from "../../redux/features/cart/cartApiSlice";
import { message } from "antd";

function ProductManagement() {
  const [deleteItem, { isLoading: deleteLoading }] = useDeleteItemMutation();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [
    getAllItems,
    { data, isLoading: itemsLoading, isError, error: getItemsErr },
  ] = useGetAllItemsMutation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      getAllItems();
      if (data) {
        setItems(data.data);
      }
    } catch (error) {
      console.log(error);
      message.open({
        content: error.message,
        key: "error",
        duration: 3,
        type: "error",
      });
    }
    if (getItemsErr) {
      message.open({
        content: getItemsErr.message,
        key: "error",
        duration: 3,
        type: "error",
      });
    }
  }, [data]);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const peoductModalCancel = () => {
    setShowAddProduct(false);
  };

  const handleProductDelete = (id) => {
    deleteItem(id);
  };

  return (
    <>
      {itemsLoading && <h1>Loading...</h1>}
      {showAddProduct && (
        <AddProduct visible={showAddProduct} onCancel={peoductModalCancel} />
      )}

      <div className="overflow-auto rounded-lg shadow md:block">
        {items.length < 1 ? (
          itemsLoading ? (
            " "
          ) : (
            <h1>No products found</h1>
          )
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
              {items.map((item) => (
                <tr className="bg-white">
                  <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                    <a
                      href="#"
                      className="font-bold text-blue-500 hover:underline"
                    >
                      #{item.itemID}
                    </a>
                  </td>

                  <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                    LKR {item.unitPrice}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                    <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                      {item.brand}
                    </span>
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                    <Button
                      type="text"
                      onClick={(e) => {
                        handleProductDelete(item.itemID);
                      }}
                      loading={deleteLoading}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                  </td>
                </tr>
              ))}
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
