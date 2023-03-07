import { Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import produkFor from "../assets/produk-4.png";

const AddProduct = () => {
  const navigate = useNavigate();
  //

  const handlerNewProduct = (e) => {
    e.preventDefault();
    const nameProduct = document.getElementById("nameProduct").value;
    const stock = document.getElementById("stock").value;
    const priceProduct = document.getElementById("priceProduct").value;
    const descriptionProduct = document.getElementById("descriptionProduct").value;
    console.log(nameProduct, stock, priceProduct, descriptionProduct);
    const date = new Date();
    const id = date.getTime();

    const newProduct = {
      nameProduct: nameProduct,
      stock: parseInt(stock),
      priceProduct: parseInt(priceProduct),
      descriptionProduct: descriptionProduct,
      id: id,
    };

    const datas = [nameProduct];

    if (typeof Storage !== "undefined") {
      console.log("web browser tersedia");

      if (localStorage.getItem("NEWPRODUCT")) {
        let items = JSON.parse(localStorage.getItem("NEWPRODUCT"));
        items.push(newProduct);
        const convertUpdate = JSON.stringify(items);
        localStorage.setItem("NEWPRODUCT", convertUpdate);
        Swal.fire({
          icon: "success",
          title: "Add Product Success",
          timer: 1500,
        });
        navigate("/list-product");
      } else {
        const convert = JSON.stringify(datas);
        localStorage.setItem("NEWPRODUCT", convert);
        Swal.alert({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
        });
      }
    } else {
      // Local storage tidak tersedia
      console.log("Maaf, browser Anda tidak mendukung local storage.");
    }
    navigate("/list-product");
  };

  return (
    <Container>
      <Container className="px-5" style={{ paddingTop: "100px", height: "80vh", backgroundColor: "" }}>
        <Row height={"50%"} className="p-1 justify-content-center">
          <Col md={8} className="">
            <Form onSubmit={handlerNewProduct}>
              <h1 className="fs-3">Add Product</h1>
              <Form.Group className="my-3">
                <Form.Control
                  type="text"
                  id="nameProduct"
                  placeholder="Name"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  type="number"
                  id="stock"
                  placeholder="Stock"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  type="number"
                  id="priceProduct"
                  placeholder="Price"
                  style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="formBasicFullName">
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ resize: "none" }}
                  id="descriptionProduct"
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
                  Add Product
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

export default AddProduct;
