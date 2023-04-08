import { useSelector, useDispatch } from "react-redux";
import { selectCurrentCart } from "../../redux/features/cart/cartSlice";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { deleteCartItems } from "../../redux/features/cart/cartSlice";
import {
  calculateSavings,
  calculateSubtotal,
} from "../../redux/features/cart/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  let subTotal = useSelector((state) => state.cart.subtotal);
  console.log("premi", subTotal);
  let savings = useSelector((state) => state.cart.savings);
  const currentCart = useSelector(selectCurrentCart);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const cartLoadingError = useSelector((state) => state.cart.error);

  const handleDelete = (id) => {
    dispatch(deleteCartItems(id));
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateSubtotal());
    dispatch(calculateSavings());
  }, [dispatch]);

  return (
    <>
      {currentCart.length < 1 ? (
        <div class="flex justify-center items-center h-screen">
          <h1 class="text-9xl text-gray-500 font-bold md:text-7xl sm:text-5xl xs:text-3xl">
            No items in the cart
          </h1>
        </div>
      ) : (
        <div>
          <div style={{ overflowY: "scroll" }} class="h-screen bg-gray-100 p-5">
            <h1 class="mb-2 text-xl">Your Cart</h1>

            <div class="hidden overflow-auto rounded-lg shadow md:block">
              <table class="w-full">
                <thead class="border-b-2 border-gray-200 bg-gray-50">
                  <tr>
                    <th class="w-20 p-3 text-left text-sm font-semibold tracking-wide"></th>
                    <th class="p-3 text-left text-sm font-semibold tracking-wide">
                      Laptop
                    </th>
                    <th class="w-24 p-3 text-left text-sm font-semibold tracking-wide">
                      Price
                    </th>
                    <th class="w-24 p-3 text-center text-sm font-semibold tracking-wide">
                      Qty
                    </th>
                    <th class="w-32 p-3 text-left text-sm font-semibold tracking-wide">
                      Total
                    </th>
                    <th class="w-32 p-3 text-left text-sm font-semibold tracking-wide"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  {currentCart.map((item) => (
                    <tr class="bg-white" id={item.itemID}>
                      <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                        <img
                          src={
                            item.images
                              ? item.images[0]
                              : "https://media.istockphoto.com/id/1177882323/vector/laptop-icon-vector-vector-illustration-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=BISYaaFJN-9oldN3WaJrWCp2siPPA4-I-B9TjquXJik="
                          }
                          alt="Product Image"
                          class="h-10 w-10 rounded-full"
                        />
                      </td>
                      <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                        {item.title ? item.title : "Some Laptop"}
                      </td>
                      <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                        <span class="text-center text-lg font-bold text-blue-500">
                          LKR {item.unitPrice}
                        </span>
                        <span
                          style={{ fontSize: "0.8rem" }}
                          class="rounded-lg bg-green-200 bg-opacity-50 pl-1 pr-1 pt-1.5 font-bold uppercase tracking-wider text-green-800"
                        >
                          {item.disPrecentage && (
                            <sup> {item.disPrecentage}% Off</sup>
                          )}
                        </span>
                      </td>
                      <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                        <div class="flex items-center justify-center">
                          <span class="px-2 text-center font-semibold">
                            {item.qty}
                          </span>
                        </div>
                      </td>
                      <td class="whitespace-nowrap p-3 text-sm font-bold text-gray-700">
                        LKR{" "}
                        {item.disPrecentage
                          ? (item.unitPrice * item.qty * item.disPrecentage) /
                            100
                          : item.unitPrice * item.qty}
                      </td>
                      <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                        <button
                          id={item.itemID + "-delete"}
                          onClick={(e) => handleDelete(item.itemID)}
                        >
                          <DeleteFilled
                            style={{ color: "red", fontSize: "1.5rem" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
              {currentCart.map((item) => (
                <div class="space-y-3 rounded-lg bg-white p-4 shadow">
                  <div class="flex items-center justify-between">
                    <div class="text-sm font-bold text-gray-700">
                      {item.title ? item.title : "Some laptop"}
                    </div>
                    <button
                      id={item.itemID + "-delete"}
                      class="h-10 w-10 text-gray-600 hover:bg-gray-200"
                      onClick={(e) => handleDelete(item.itemID)}
                    >
                      <DeleteFilled
                        style={{ color: "red", fontSize: "1.5rem" }}
                      />{" "}
                    </button>
                  </div>
                  <div class="text-sm font-medium text-blue">
                    LKR {item.unitPrice}
                    <span
                      class="rounded-lg bg-green-200 bg-opacity-50 pl-1 pr-1 pt-1.5 font-bold uppercase tracking-wider text-green-800"
                      style={{ fontSize: "0.8rem", marginLeft: "0.3rem" }}
                    >
                      {item.disPrecentage && (
                        <sup>{item.disPrecentage}% Off</sup>
                      )}
                    </span>
                  </div>
                  <div class="flex items-center justify-start">
                    <span
                      class="text-center font-semibold text-black"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div class="divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-md sm:flex sm:justify-between">
              <div class="p-4 sm:p-6">
                <div class="text-lg font-medium text-gray-900">
                  Cart Summary
                </div>
                <div class="mt-4">
                  <div class="flex justify-between text-gray-600">
                    <div>Subtotal:</div>
                    <div class="px-3 font-bold">LKR {subTotal}</div>
                  </div>
                  <div class="mt-2 flex justify-between text-gray-600">
                    <div>Savings:</div>
                    <div class="px-3 font-bold text-green-500">
                      -LKR {savings}
                    </div>
                  </div>
                  <div class="mt-2 flex justify-between font-medium text-gray-900">
                    <div class="my-2">Total:</div>
                    <div class="my-2 border-b-8 border-t px-3">
                      <div class="font-bold">LKR {subTotal - savings}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
