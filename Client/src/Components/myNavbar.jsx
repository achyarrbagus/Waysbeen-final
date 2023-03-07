import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "../assets/icon.png";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { json, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import "../styles.css";
import IsLoginNav from "./IsLoginNav";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//
import { ContextGlobal } from "../assets/context/Context";
import { useContext, useEffect } from "react";

const containerNav = {
  backgroundColor: "#F5F5F5",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
  border: "2px solid #613D2B",
};

const loginButton = {
  backgroundColor: "white",
  color: "#613D2B",
  border: "2px solid #613D2B",
  width: "100px",
};

const registerButton = {
  backgroundColor: "#613D2B",
  color: "white",
  width: "100px",
  border: "2px solid #613D2B",
};

const MyNavbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showL, setShowL] = useState(false);

  const { kumpulanState } = useContext(ContextGlobal);
  const { userData, setUserData, islogin, setLogin, adminlogin, setAdminLogin } = kumpulanState;
  const [inputLogin, setInputLogin] = useState([
    {
      email: "",
      password: "",
    },
  ]);
  const userDataLocal = JSON.parse(localStorage.getItem("USERDATA"));

  const handleDiretToAdmin = () => {
    navigate("/admin");
  };

  const handleRegisterChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const date = new Date();
  const userId = date.getTime();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fullname = document.getElementById("fullname").value;
    const newUser = {
      email: email,
      password: password,
      fullname: fullname,
      chart: [],
      id: userId,
    };

    const datas = [newUser];

    if (typeof Storage !== "undefined") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Browserr Not Comppatible!",
      });
      if (localStorage.getItem("USERDATA")) {
        let items = JSON.parse(localStorage.getItem("USERDATA"));
        items.push(newUser);
        const convertUpdate = JSON.stringify(items);
        localStorage.setItem("USERDATA", convertUpdate);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Created Account Success!",
        });
      } else {
        const convert = JSON.stringify(datas);
        localStorage.setItem("USERDATA", convert);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Created Account Success!",
        });
      }
    } else {
      // Local storage tidak tersedia
      console.log("Maaf, browser Anda tidak mendukung local storage.");
    }
  };

  //
  const handleLoginChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const found = userDataLocal.find((user) => user.email === inputLogin.email && user.password === inputLogin.password);
    const admin = userData.find(
      (user) => user.email === inputLogin.email && user.password === inputLogin.password && user.role === "admin"
    );

    if (admin) {
      setAdminLogin(true);
      const islogin = admin;
      localStorage.setItem("ISLOGIN", JSON.stringify(admin));
      handleDiretToAdmin();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Loginn... Success!",
      });
    } else if (found) {
      setLogin(true);
      const islogin = found;
      localStorage.setItem("ISLOGIN", JSON.stringify(islogin));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Loginn... Success!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Account Not Found!",
      });
    }

    setInputLogin([
      {
        email: "",
        password: "",
      },
    ]);
  };
  //
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ISLOGIN"));
    if (user) {
      setLogin(false);
    }

    checkQty();
    const handleStorageChange = (event) => {
      checkQty();
    };

    window.addEventListener("storage", checkQty);
  }, []);

  //
  const [qty, setqty] = useState(0);
  const checkQty = () => {
    const chartData = JSON.parse(localStorage.getItem("CHARTDATA")) || [];
    let tmp = 0;
    chartData.map((item, index) => {
      tmp += item.quantity;
    });
    setqty(tmp);
  };

  //

  const handleCloseRegister = () => setShow(false);
  const handleShowRegister = () => setShow(true);
  //
  const handleCloseLogin = () => setShowL(false);
  const handleShowLogin = () => setShowL(true);
  //
  const TriggerBtnL = () => {
    setShowL(true);
    setShow(false);
  };
  //
  const TriggerBtnR = () => {
    setShowL(false);
    setShow(true);
  };

  if (adminlogin === true) {
    return (
      <>
        <AdminNav
          admin={() => {
            setAdminLogin(false);
          }}
        />
        ;
      </>
    );
  } else if (islogin === true) {
    return (
      <>
        <IsLoginNav login={() => setLogin(false)} qty={qty} />;
      </>
    );
  } else {
    return (
      <>
        <Navbar expand="lg" className="container-fluid" style={containerNav} fixed="top">
          <Container bg="light">
            <Link to={"/"}>
              <Navbar.Brand>
                <img src={Icon} className="img-fluid" width={"163.11px"} height={"height: 47.11px;"} />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
              <Form className="d-flex gap-2">
                <Button style={loginButton} onClick={() => handleShowLogin(true)}>
                  Login
                </Button>
                <Button style={registerButton} onClick={() => handleShowRegister(true)}>
                  Register
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
          {/* register modal */}
          <Modal centered show={show} onHide={handleCloseRegister} backdrop="static" keyboard={false} className="w-100 ">
            <Modal.Header closeButton>
              <Modal.Title className="fs-2 fw-bolder">Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleRegisterSubmit}>
                <div className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <div className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <div className="mb-3" controlId="formBasicFullName">
                  <Form.Control
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={userData.fullname}
                    placeholder="Full Name"
                    onChange={handleRegisterChange}
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </div>
                <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100">
                  Register
                </Button>
              </Form>
            </Modal.Body>

            <footer className="p-3">
              <p style={{ height: "20px" }} className="text-center">
                Already have an account ? Klik{" "}
                <span className="fw-bolder">
                  {" "}
                  <button onClick={TriggerBtnL} style={{ background: "none" }}>
                    Here
                  </button>
                </span>{" "}
              </p>
            </footer>
          </Modal>
          {/* end */}
          {/* login modal */}
          <Modal centered show={showL} onHide={handleCloseLogin} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="fs-2 fw-bolder">Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    name="email"
                    type="email"
                    onChange={handleLoginChange}
                    placeholder="Email"
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    name="password"
                    value={inputLogin.password}
                    onChange={handleLoginChange}
                    type="password"
                    placeholder="Password"
                    style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                  />
                </Form.Group>
                <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100">
                  Login
                </Button>
              </Form>
            </Modal.Body>

            <footer className="p-3">
              <p style={{ height: "20px" }} className="text-center">
                Already have an account ? Klik{" "}
                <span className="fw-bolder">
                  <button onClick={TriggerBtnR} style={{ background: "none" }}>
                    Here
                  </button>
                </span>{" "}
              </p>
            </footer>
          </Modal>
          {/* end */}
        </Navbar>
      </>
    );
  }
};

export default MyNavbar;
