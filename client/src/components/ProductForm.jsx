import React from "react";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';

export default function ProductForm({ selectedProduct }) {

const showProduct = selectedProduct.map((item,i) => {
        return (
          <form key={i}>
            <Form.Group  className="mb-3" controlId="formGroupEmail">
              <Form.Label>S2P Catalog Number </Form.Label>
              <Form.Control  type="text" defaultValue={item.cn_s2p} />
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formGroupEmail">
              <Form.Label >Client Catalog Number </Form.Label>
              <Form.Control   type="text" defaultValue={item.cn_client} />
            </Form.Group>

            <Form.Group   className="mb-3" controlId="formGroupEmail">
              <Form.Label >Company </Form.Label>
              <Form.Control  type="text" defaultValue={item.company} />
            </Form.Group>

            <Form.Group   className="mb-3" controlId="formGroupEmail">
              <Form.Label >Description </Form.Label>
              <Form.Control  type="text" defaultValue={item.description} />
            </Form.Group>
          </form>

        );
      })
  return (
  <Row>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="cart.png" />
    </Card>
    {showProduct}
    </Row>
  );
}
