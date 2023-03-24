import React from "react";
import { useState, useEffect } from "react";
import { updateProduct } from "../services/productsService";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductForm.css";
import { useReactToPrint } from "react-to-print";

export default function ProductForm({ selectedProduct }) {
  const ref_id = React.useRef(null);
  const refCn_s2p = React.useRef(null);
  const refDescription = React.useRef(null);
  const refCompany = React.useRef(null);
  const refCn_client = React.useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [product, setProduct] = useState([{}]);
  const [order, setOrder] = useState("");
  const [quantity, setQuantity] = useState("");

  const [imagePath, setImagePath] = useState("");
  const [sentToPrint, setSentToPrint] = useState(false);

  //handlePrint:
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // function to handle form submit and image upload

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setProduct((prevProduct) => ({
      ...prevProduct,
      cn_s2p: refCn_s2p.current.value,
      description: refDescription.current.value,
      _id: ref_id.current.value,
      company: refCompany.current.value,
      cn_client: refCn_client.current.value,
    }));
  };

  // function to handle image input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(...product);
    setProduct((prevProduct) => [
      {
        ...prevProduct[0],
        image: file,
      },
    ]);
    setImagePath(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (sentToPrint) {
      console.log("Sending to print!");
      handlePrint();
      setSentToPrint(false);
    }
  }, [sentToPrint, handlePrint]);

  useEffect(() => {
    if (selectedProduct.length > 0) {
      console.log("Say Hello");
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);

  useEffect(() => {
    console.log(product);
    if (isSubmit) {
      // function to handle form submit and image upload
      const handleSubmit = async () => {
        const file = product[0].image;
        const formDataForImage = new FormData();
        formDataForImage.append("image", file);
        console.log("product._id:", product._id);
        console.log("formDataForImage:", formDataForImage);
        const response = await updateProduct(product._id, formDataForImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        console.log(response.data.updated.imagePath);
        setProduct([response.data.updated]);
        setImagePath(null);
        setIsSubmit(false);
      };
      handleSubmit();
    }
  }, [isSubmit, product]);

  return (
    <Row>
      <br />

      {product && selectedProduct.length > 0 && (
        <Row>
          <div
            dir="rtl"
            id="print-block"
            ref={componentRef}
            style={{ marginTop: sentToPrint === true ? "200px" : "0px" }}
          >
            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
              {/* Show a preview Image before uploading */}
              {imagePath && (
                <Card style={{ width: "18rem", marginBottom: "20px" }}>
                  <Card.Img variant="top" src={imagePath} alt="pre image" />
                </Card>
              )}
              {product[0].imagePath && (
                <Card
                  style={{
                    width: "18rem",
                    height: "21.652rem",
                    margin: "25px 0",
                    padding: "1rem 0",
                  }}
                >
                  <Card.Img
                    style={{ width: "18rem", height: "20.652rem" }}
                    variant="top"
                    src={`http://localhost:5000/${product[0].imagePath}`}
                    alt="uploaded image"
                  />
                </Card>
              )}
              <Form.Group
                className="mb-3 form-group "
                controlId="formGroupFile"
              >
                <Form.Label> תמונה:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group
                className=" mb-3 form-group "
                controlId="formGroup_id"
              >
                <Form.Label>_id:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={product[0]._id}
                  ref={ref_id}
                />
              </Form.Group>

              {/* --------- */}
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupCn_s2p"
              >
                <Form.Label>מק''ט S2P:</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setProduct({ ...product, cn_s2p: e.target.value })
                  }
                  type="text"
                  ref={refCn_s2p}
                  defaultValue={product[0].cn_s2p}
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
                    setProduct({ ...product, cn_client: e.target.value })
                  }
                  type="text"
                  ref={refCn_client}
                  defaultValue={product[0].cn_client}
                />
              </Form.Group>

              {/* --------- */}
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupCompany"
              >
                <Form.Label>שם הלקוח:</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setProduct({ ...product, company: e.target.value })
                  }
                  type="text"
                  ref={refCompany}
                  defaultValue={product[0].company}
                />
              </Form.Group>

              {/* --------- */}
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupDescription"
              >
                <Form.Label>תיאור פריט:</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  type="text"
                  ref={refDescription}
                  defaultValue={product[0].description}
                />
              </Form.Group>

              {/* --------- */}
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupOrder"
              >
                <Form.Label>הזמנה:</Form.Label>
                <Form.Control
                  onChange={(e) => setOrder(e.target.value)}
                  type="text"
                  // ref={refDescription}
                  value={order}
                />
              </Form.Group>

              {/* --------- */}
              <Form.Group
                className="mb-3 form-group"
                controlId="formGroupQuantity"
              >
                <Form.Label>כמות:</Form.Label>
                <Form.Control
                  onChange={(e) => setQuantity(e.target.value)}
                  type="text"
                  value={quantity}
                />
              </Form.Group>

              {/* --------- */}
              <div
                className="formButtons"
                style={{ display: sentToPrint === true ? "none" : "block" }}
              >
                <Button type="submit" variant="success">
                  שלח
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    setSentToPrint(true);
                    //  if (setSentToPrint) {

                    //     handlePrint()
                    //  }
                    // await setSentToPrint(false)
                  }}
                >
                  הדפסה
                </Button>
              </div>
            </form>
          </div>
        </Row>
      )}
    </Row>
  );
}
