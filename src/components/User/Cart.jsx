import { useSelector, useDispatch } from "react-redux";
import { selectCurrentCart } from "../../redux/features/cart/cartSlice";
import { fetchCartItems } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
    console.log("fetchCartItems11");
  }, [dispatch]);

  const currentCart = useSelector(selectCurrentCart);
  console.log(currentCart);
  return (
    <div>
      {/*  {currentCart.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))} */}
    </div>
  );
}

export default Cart;
