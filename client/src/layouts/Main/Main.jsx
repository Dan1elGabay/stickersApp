import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getAllProducts } from "../../services/productsService";
// import SearchBar from "../../components/SearchBar";
import ProductForm from "../../components/ProductForm";
import SearchBarAutoComplete from "../../components/SearchBarAutoComplete";
import AddNewProduct from "../../components/AddNewProduct";

export default function Main() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    getAllProducts().then((response) => {
      setData(response.data.found);
    });
  }, [selectedProduct]);

  //todo to create new product:
  /*
 const updateDate = (newData)=>{
  setData(...data,)
 }*/

  const selectedProductFunc = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <Container>
        <Row className="mb-3">
          <Col>
      <div className="whiteBackground">
            <h1>Stickers App</h1>
      </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <SearchBarAutoComplete
              data={data}
              selectedProduct={selectedProductFunc}
            ></SearchBarAutoComplete>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col>
            <AddNewProduct></AddNewProduct>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <ProductForm selectedProduct={selectedProduct}></ProductForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
