import React from "react";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { createProduct } from "../services/productsService";
import Col from "react-bootstrap/esm/Col";

export default function AddNewProduct() {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    cn_s2p: "",
    cn_client: "",
    company: "",
    description: "",
    image: null,
  });
  const [imagePath, setImagePath] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClick = ()=>{
    setShowForm(true)
  }

  
  const handleCancel = ()=>{
    setShowForm(false)
  }
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  useEffect(() => {
    if (isSubmit) {
      const handleSubmit = async () => {
        console.log(newProduct);

        const formData = new FormData();
        formData.append("cn_s2p", newProduct.cn_s2p);
        formData.append("cn_client", newProduct.cn_client);
        formData.append("company", newProduct.company);
        formData.append("description", newProduct.description);
        formData.append("image", newProduct.image);
        const response = await createProduct(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        console.log(response.data.inserted.imagePath);
        //after get the response dont show the form
        // const [showForm, setShowForm] = useState(false);
        console.log(
          `Created new product: ${response.data.inserted.description}`
        );

        setImagePath(null);
        setIsSubmit(false);
      };
      handleSubmit();
    }
  }, [isSubmit, newProduct]);

  // function to handle image input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
    });
    setImagePath(URL.createObjectURL(file));
  };

  return (
    <div>
      {!showForm && (
        <Row>
          <Col>
          <Button type="button" onClick={handleClick}>הוסף מוצר חדש</Button>
          </Col>
        </Row>
      )}
      
      {showForm&&(

        <Row>
         
          <form onSubmit={onSubmitHandler} encType="multipart/form-data">
            {/* Show a preview Image before uploading */}
            {imagePath && (
              <Card style={{ width: "18rem", marginBottom: "20px" }}>
                <Card.Img variant="top" src={imagePath} alt="pre image" />
              </Card>
            )}

            {/* after post i want to send a msg that the action success or failed */}
            {/* {product[0].imagePath && (
            <Card style={{ width: "18rem",margin:'25px 0' }}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${product[0].imagePath}`}
                alt="uploaded image"
              />
            </Card>
          )} */}
            <Form.Group className="mb-3 form-group " controlId="formGroupFile">
              <Form.Label> תמונה:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
            {/* --------- */}

            <Form.Group
              className="mb-3 form-group"
              controlId="formGroupCn_client"
            >
              <Form.Label>מק''ט S2P:</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setNewProduct({ ...newProduct, cn_s2p: e.target.value })
                }
                type="text"
                required
              />
            </Form.Group>
            {/* --------- */}
            <Form.Group
              className="mb-3 form-group"
              controlId="formGroupCn_client"
            >
              <Form.Label>מק''ט לקוח:</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setNewProduct({ ...newProduct, cn_client: e.target.value })
                }
                type="text"
                required
              />
            </Form.Group>
            {/* --------- */}

            <Form.Group
              className="mb-3 form-group"
              controlId="formGroupCn_client"
            >
              <Form.Label>שם הלקוח:</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setNewProduct({ ...newProduct, company: e.target.value })
                }
                type="text"
                required
              />
            </Form.Group>
            {/* --------- */}
            <Form.Group
              className="mb-3 form-group"
              controlId="formGroupCn_client"
            >
              <Form.Label>תיאור פריט:</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
                type="text"
                required
              />
            </Form.Group>

            {/* --------- */}
            <div className="formButtons">
              <Button type="submit" variant="success">
                צור פריט חדש
              </Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>חזור</Button>

            </div>
          </form>
        </Row>
      )}
    </div>
  );
}
