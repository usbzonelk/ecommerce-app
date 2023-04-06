import { useSelector, useDispatch } from "react-redux";
import { selectCurrentCart } from "../../redux/features/cart/cartSlice";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";

function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const currentCart = useSelector(selectCurrentCart);
  console.log(currentCart);
  return (
    <div>
      <div class="h-screen bg-gray-100 p-5">
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
              <tr class="bg-white">
                <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                  <img
                    src="https://cdn-sales.optimonk.com/wp-content/uploads/shopping-cart-page-05.png"
                    alt="Product Image"
                    class="h-10 w-10 rounded-full"
                  />
                </td>
                <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                  Dell XPS 13
                </td>
                <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                  <span class="text-center text-lg font-bold text-blue-500">
                    $200.00
                  </span>
                  <span
                    style={{ fontSize: "0.8rem" }}
                    class="rounded-lg bg-green-200 bg-opacity-50 pl-1 pr-1 pt-1.5 font-bold uppercase tracking-wider text-green-800"
                  >
                    <sup> 25% Off</sup>
                  </span>
                </td>
                <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                  <div class="flex items-center justify-center">
                    <button class="h-6 w-6 rounded-full text-gray-600 hover:bg-gray-200">
                      <i class="fas fa-minus">-</i>
                    </button>
                    <span class="px-2 text-center font-semibold">1</span>
                    <button class="h-6 w-6 rounded-full text-gray-600 hover:bg-gray-200">
                      <i class="fas fa-plus">+</i>
                    </button>
                  </div>
                </td>
                <td class="whitespace-nowrap p-3 text-sm font-bold text-gray-700">
                  $200.00
                </td>
                <td class="whitespace-nowrap p-3 text-sm text-gray-700">
                  <button>
                    <DeleteFilled
                      style={{ color: "red", fontSize: "1.5rem" }}
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          <div class="space-y-3 rounded-lg bg-white p-4 shadow">
            <div class="flex items-center justify-between">
              <div class="text-sm font-bold text-gray-700">
              Dell XPS 13
              </div>
              <button class="h-10 w-10 text-gray-600 hover:bg-gray-200">
                <DeleteFilled style={{ color: "red", fontSize: "1.5rem" }} />{" "}
              </button>
            </div>
            <div class="text-sm font-medium text-black">
              $200.00
              <span
                class="rounded-lg bg-green-200 bg-opacity-50 pl-1 pr-1 pt-1.5 font-bold uppercase tracking-wider text-green-800"
                style={{ fontSize: "0.8rem", marginLeft: "0.3rem" }}
              >
                <sup>25% Off</sup>
              </span>
            </div>
            <div class="flex items-center justify-start">
              <button class="mr-2 h-6 w-6 rounded-full text-gray-600 hover:bg-gray-200">
                <i class="fas fa-minus">-</i>
              </button>
              <span
                class="text-center font-semibold text-black"
                style={{ fontSize: "1.5rem" }}
              >
                1
              </span>
              <button class="ml-2 h-6 w-6 rounded-full text-gray-600 hover:bg-gray-200">
                <i class="fas fa-plus">+</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
