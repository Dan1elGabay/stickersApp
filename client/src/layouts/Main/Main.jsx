import React from 'react'
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    getAllProducts
  } from '../../services/productsService'
import SearchBar from '../../components/SearchBar';
import ProductForm from '../../components/ProductForm';
  

export default function Main() {
    const [data, setData] = useState([]);
    const [selectedProduct
        , setSelectedProduct] = useState([]);
    useEffect(() => {
        getAllProducts().then((response) => {
        setData(response.data.found);
      });
    }, []);

    const selectedProductFunc = (product) =>{
        console.log(`${product[0].description} is the selected product`);
        setSelectedProduct(product)
    }

  return (
<Container>
      <Row className="mb-3">
        <Col><SearchBar data = {data} selectedProduct={selectedProductFunc}></SearchBar></Col>
      </Row>
      <ProductForm selectedProduct = {selectedProduct}></ProductForm>
    </Container>  )
}
