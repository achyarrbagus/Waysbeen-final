import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import produkFor from "../assets/produk-4.png";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  //
  const index = parseInt(useParams().id);
  const data = JSON.parse(localStorage.getItem("EDITPRODUCT"));
  const navigate = useNavigate();

  const [editData, setEditData] = useState(data);

  const handleRegisterChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setEditData({ ...editData, [name]: value });
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log(index);
    const dataProduct = JSON.parse(localStorage.getItem("NEWPRODUCT"));

    dataProduct.splice(index, 1, editData);
    localStorage.setItem("NEWPRODUCT", JSON.stringify(dataProduct));
    setEditData(dataProduct);
    console.log(dataProduct);
    navigate(`/list-product`);
  };

  return (
    <Container>
      <Container className="px-5" style={{ paddingTop: "100px", height: "80vh", backgroundColor: "" }}>
        <Row height={"50%"} className="p-1 justify-content-center">
          <Col md={8} className="">
            <Form onSubmit={handleSubmitEdit}>
              <h1 className="fs-3">Add Product</h1>
              <Form.Group className="my-3" controlId="nameProduct">
                <Form.Control
                  type="text"
                  onChange={handleRegisterChange}
                  value={editData.nameProduct}
                  placeholder="Name Product"
                  name="nameProduct"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="stock">
                <Form.Control
                  type="text"
                  onChange={handleRegisterChange}
                  value={editData.stock}
                  name="stock"
                  placeholder="Stock"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="priceProduct">
                <Form.Control
                  type="text"
                  onChange={handleRegisterChange}
                  value={editData.priceProduct}
                  name="priceProduct"
                  placeholder="Price"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="descriptionProduct">
                <Form.Control
                  type="text"
                  id="descriptionProduct"
                  value={editData.descriptionProduct}
                  onChange={handleRegisterChange}
                  name="descriptionProduct"
                  placeholder="Description Product"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              {/* <Form.Group controlId="formFile" className="mt-3 w-50 ">
              <Form.Control type="file" className="" />
            </Form.Group> */}
              <Container className=" d-flex justify-content-center mt-3">
                <button
                  className="d-flex justify-content-center align-items-center"
                  style={{ border: "none", width: "260px", height: "40px", backgroundColor: "#613D2B", color: "white" }}
                >
                  Edit Product
                </button>
              </Container>
            </Form>
          </Col>
          <Col className="" md={4}>
            <img src={produkFor} width={"100%"} height={"auto"} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default EditProduct;
