import React from "react";
import { useState, useEffect } from "react";
import { updateProduct } from "../services/productsService";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ProductFormButtons from "./ProductFormButtons";

export default function ProductForm({ selectedProduct }) {
  const refCn_s2p = React.useRef(null);
  const refDescription = React.useRef(null);
  const refCompany = React.useRef(null);
  const refCn_client = React.useRef(null);
  const ref_id = React.useRef(null);

  const [isSubmit, setIsSubmit] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    cn_s2p: "",
    description: "",
    cn_client: "",
    company: "",
    isEdited: Boolean(false),
    isActive: Boolean(true),
  });
  const [imagePath, setImagePath] = useState("");

  // function to handle form submit and image upload
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setProduct({
      ...product,
      cn_s2p: refCn_s2p.current.value,
      description: refDescription.current.value,
      _id: ref_id.current.value,
      company: refCompany.current.value,
      cn_client: refCn_client.current.value,
    });
  };

  useEffect((e) => {

    if (isSubmit) {
      // function to handle form submit and image upload
      const handleSubmit = async () => {

        const file = product.image;
        const formDataForImage = new FormData();
        formDataForImage.append('image', file);
        console.log('product._id:', product._id);
        console.log('formDataForImage:', formDataForImage);
        const response = await updateProduct(product._id, formDataForImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(response);
        console.log(response.data.updated.imagePath);

      
    
        setImagePath(response.data.updated.imagePath);
      };
      handleSubmit()
    }
  }, [product, isSubmit]);


  // function to handle image input change
  const handleImageChange = (event) => {
    setProduct({
      ...product,
      image: event.target.files[0],
    });
  };

  const showProduct = selectedProduct.map((item, i) => {
    console.log(item);
    return (
      <Row key={i}>
          {item.imagePath && (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${item.imagePath}`}
            alt="uploaded image"
          />
        </Card>
      )}
      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="formGroupFile">
          <Form.Label>Upload product image:</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroup_id">
          <Form.Label>_id</Form.Label>
          <Form.Control type="text" defaultValue={item._id} ref={ref_id} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCn_s2p">
          <Form.Label>S2P Catalog Number </Form.Label>
          <Form.Control
            onChange={(e) => setProduct({ ...product, cn_s2p: e.target.value })}
            type="text"
            defaultValue={item.cn_s2p}
            ref={refCn_s2p}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCn_client">
          <Form.Label>Client Catalog Number </Form.Label>
          <Form.Control
            onChange={(e) =>
              setProduct({ ...product, cn_client: e.target.value })
            }
            type="text"
            defaultValue={item.cn_client}
            ref={refCn_client}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupCompany">
          <Form.Label>Company </Form.Label>
          <Form.Control
            onChange={(e) =>
              setProduct({ ...product, company: e.target.value })
            }
            type="text"
            defaultValue={item.company}
            ref={refCompany}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupDescription">
          <Form.Label>Description </Form.Label>
          <Form.Control
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            type="text"
            defaultValue={item.description}
            ref={refDescription}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <ProductFormButtons></ProductFormButtons>
      </form>
      </Row>
    );
  });
  return (
    <Row>
      <br />
      {imagePath && (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${imagePath}`}
            alt="uploaded image"
          />
        </Card>
      )}
      {showProduct}
    </Row>
  );
}
