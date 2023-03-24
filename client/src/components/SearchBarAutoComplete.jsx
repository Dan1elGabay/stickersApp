import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SearchBarAutoComplete.css";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import AddNewProduct from "./AddNewProduct";

export default function SearchBarAutoComplete({ data, selectedProduct }) {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedListItem, setSelectedListItem] = useState(-1);
  const searchContainer = useRef(null);

  useEffect(() => {
    if (searchValue !== "") {
      setSearchData(data);
    }
  }, [searchValue, data]);

  const handleChoose = (itemDescription, item) => {
    setSearchValue(itemDescription);
    selectedProduct([item]);
    console.log("Search ", itemDescription);
  };

  const handleClose = () => {
    setSearchValue("");
    setSearchData([]);
  selectedProduct([])
    setSelectedListItem(-1);
  };
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeydown = (e) => {
    if (selectedListItem < searchData.length) {
      if (e.key === "ArrowUp" && selectedListItem > 0) {
        setSelectedListItem((previousState) => previousState - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedListItem < searchData.length - 1
      ) {
        setSelectedListItem((previousState) => previousState + 1);
      } else if (e.key === "Enter" && selectedListItem >= 0) {
        console.log("User Pressed Enter");
        // onSearch(item.description,item)
      } else if (e.key === "Escape") {
        handleClose();
      }
    } else {
      setSelectedListItem(-1);
    }
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       searchContainer.current &&
  //       !searchContainer.current.contains(event.target)
  //     ) {
  //       handleClose();
  //     }
  //   };

  //   window.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Row>
      <section className="search_section" ref={searchContainer}>
        <Row>
          <Col>
            <div className="search_input_div">
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  className="search_input"
                  placeholder="הקלד מספר מקט או שם מוצר"
                  autoComplete="off"
                  aria-label="
            Search"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  value={searchValue}
                  onKeyDown={handleKeydown}
                />
              </InputGroup>
              <div className="input-group-btn">
                <button
                  type="button"
                  onClick={() => console.log("Clicked")}
                  className="btn btn-search btn-danger"
                >
                  <span className="label-icon">
                    {" "}
                    {searchValue === "" ? "חפש" : "סגור"}
                  </span>
                  <span className="label-icon">
                    {searchValue === "" ? (
                      <FaSearch />
                    ) : (
                      <FaWindowClose onClick={handleClose} />
                    )}
                  </span>
                </button>
              </div>
             
            </div>
            <Row>
              <div className="search_result">
                {searchData
                  .filter((item) => {
                    const searchTerm = searchValue.toLowerCase();
                    const description = item.description.toLowerCase();
                    const cnS2p = String(item.cn_s2p);
                    return (
                      searchTerm &&
                      description !== searchTerm &&
                      (description.startsWith(searchTerm) ||
                        cnS2p.startsWith(searchTerm))
                    );
                  })
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();

                        handleChoose(item.description, item);
                      }}
                      className={
                        selectedListItem === index
                          ? "search_suggestion_line active"
                          : "search_suggestion_line"
                      }
                      key={index}
                    >
                      <span>{item.company}</span>
                      <span>{item.description}</span>
                      <span>{item.cn_s2p}</span>
                    </div>
                  ))}
              </div>
            </Row>
          </Col>
        </Row>
      </section>
    </Row>
  );
}
