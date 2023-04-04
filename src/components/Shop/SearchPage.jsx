import { Tag, Card, Row, Col } from "antd";
import SearchControls from "./SearchControls";
import ShowShopItems from "./ShowShopItems";

const SearchPage = () => (
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
);

export default SearchPage;
