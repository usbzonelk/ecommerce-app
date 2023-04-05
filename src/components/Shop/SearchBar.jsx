import { Input } from "antd";
import { useState, useEffect } from "react";
import { useGetItemsOnSearchMutation } from "../../redux/features/products/itemApiSlice";
import { message } from "antd";
import {
  setIsLoadingItems,
  setItems,
} from "../../redux/features/products/productsSlice";

import { useSelector, useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState(
    new URLSearchParams(window.location.search).get("search") || ""
  );
  const [searchInput, setSearchInput] = useState(searchString);
  const [getItemsOnSearch, { isLoading }] = useGetItemsOnSearchMutation();

  useEffect(() => {
    if (searchString) {
      getSearchItems();
    }
  }, [searchString]);

/*   let productItems = useSelector((state) => state.items.items);
 */
  const getSearchItems = async () => {
    let searchResults = "";
    dispatch(setIsLoadingItems(true));
    try {
      searchResults = await getItemsOnSearch(searchString).unwrap();
      searchResults = searchResults.data;
      dispatch(setItems(searchResults));
      dispatch(setIsLoadingItems(false));
    } catch (err) {
      dispatch(setIsLoadingItems(false));

      if (!err?.originalStatus) {
        message.error("Could not connect to server");
      } else if (err.originalStatus === 404) {
        dispatch(setItems([]));
      } else if (err.originalStatus === 401) {
        message.error("Unauthorized");
      } else {
        message.error("Login Failed");
      }
    }
    console.log("searchResults", searchResults);
  };

  return (
    <Input.Search
      value={searchInput}
      size="large"
      style={{
        marginTop: "2rem",
        padding: "5rem",
        marginBottom: "2rem",
        paddingBottom: "1rem",
        paddingTop: "1rem",
      }}
      placeholder="Search"
      onSearch={(value) => {
        setSearchString(value);
        getSearchItems();
      }}
      onChange={(e) => {
        setSearchInput(e.target.value);
      }}
    />
  );
}

export default SearchBar;
