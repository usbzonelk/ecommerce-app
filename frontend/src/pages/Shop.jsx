import SearchControls from "../components/Shop/SearchControls";
import ShowShopItems from "../components/Shop/ShowShopItems";
import { Provider } from "react-redux";
import store from "../redux/store";
import SearchBar from "../components/Shop/SearchBar";

const Shop = () => (
  <Provider store={store}>
    <div className="shop">
      <div className="shop-header">
        <h3>Shop</h3>
        <SearchBar />
      </div>

      <div className="container">
        <SearchControls />
        <ShowShopItems />
      </div>
    </div>
  </Provider >
);

export default Shop;
