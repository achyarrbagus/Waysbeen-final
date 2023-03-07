import React, { useState } from "react";
import { ContextGlobal } from "../assets/context/Context";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { json, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShippingModal = () => {
  const { kumpulanState } = useContext(ContextGlobal);
  const date = new Date();
  const navigate = useNavigate();
  const { chartData, setChartData, stateQuantity, setStateQuantity, showModal, setShowModal } = kumpulanState;
  const myTrans = localStorage.getItem("MYTRANS");
  const data = JSON.parse(myTrans);
  const product = data.product;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    shippingAddress: "",
    shippingPostCode: "",
    paymentProve: "",
    productOrder: product,
    id: date.getTime(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = localStorage.getItem("PAYMENT");
    if (found === null) {
      const payment = [formData];
      const convert = JSON.stringify(payment);
      localStorage.setItem("PAYMENT", convert);
    } else {
      const payment = JSON.parse(localStorage.getItem("PAYMENT"));
      payment.push(formData);
      const convert = JSON.stringify(payment);
      localStorage.setItem("PAYMENT", convert);
      console.log(data);
    }
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-2 fw-bolder">Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Alamat Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Your Number"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="shippingPostCode"
                value={formData.shippingPostCode}
                onChange={handleInputChange}
                placeholder="Shipping Post Code"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="paymentProve"
                value={formData.paymentProve}
                onChange={handleInputChange}
                required
                placeholder="Payment Prove"
              />
            </Form.Group>

            <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100 mt-2">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default ShippingModal;
