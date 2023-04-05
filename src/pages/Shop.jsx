import SearchControls from "../components/Shop/SearchControls";
import ShowShopItems from "../components/Shop/ShowShopItems";
import { Provider } from "react-redux";
import store from "../redux/store";

import SearchBar from "../components/Shop/SearchBar";
const Shop = () => (
  <>
    <Provider store={store}>
      <SearchBar />
      <div
        style={{
          display: "flex",
          position: "relative",
          marginRight: "0rem",
          paddingRight: "0rem",
        }}
      >
        <SearchControls style={{ flex: "0 0 auto" }} />
        <ShowShopItems style={{ flex: "1 1 auto" }} />
      </div>
    </Provider>
  </>
);

export default Shop;
