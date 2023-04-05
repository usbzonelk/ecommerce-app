import { Tag, Card, Row, Col } from "antd";
import SearchControls from "./SearchControls";
import ShowShopItems from "./ShowShopItems";
import { Provider } from "react-redux";
import store from "../../redux/store";

const SearchPage = () => (
  <div
    style={{
      display: "flex",
      position: "relative",
      marginRight: "0rem",
      paddingRight: "0rem",
    }}
  >
    <Provider store={store}>
      <SearchControls style={{ flex: "0 0 auto" }} />
    </Provider>
    <ShowShopItems style={{ flex: "1 1 auto" }} />
  </div>
);

export default SearchPage;
