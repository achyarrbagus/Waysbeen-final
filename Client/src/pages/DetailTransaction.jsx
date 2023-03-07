import { Container, Row, Col } from "react-bootstrap";
import Profil from "../assets/Killua.jpg";
import Icon from "../assets/icon.png";
import ProductOne from "../assets/produk-1.png";
import Qr from "../assets/qr.png";
import { json } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailTransaction = () => {
  const [chart, setChart] = useState([]);
  const [isLogin, setIsLogin] = useState({});
  const [trans, setTrans] = useState({});

  const fecthData = () => {
    const myTrans = JSON.parse(localStorage.getItem("MYTRANS"));
    setTrans(myTrans);
    const isLogin = JSON.parse(localStorage.getItem("ISLOGIN"));
    setIsLogin(isLogin);
    const chart = JSON.parse(localStorage.getItem("CHARTDATA"));
    setChart(chart);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row style={{ padding: "50px", height: "60vh" }}>
        <Col className="">
          <div>
            <h3 className="fs-3">My Profil</h3>
          </div>
          <div className="d-flex gap-5">
            <div className="mt-2">
              <img src={Profil} />
            </div>
            <div>
              <div className="my-3">
                <h5>Full Name</h5>
                <h5>{isLogin.fullname}</h5>
              </div>
              <div className="my-3">
                <h5>Email</h5>
                <h5>{isLogin.email}</h5>
              </div>
            </div>
          </div>
        </Col>
        <Col className="">
          <div>
            <h3 className="fs-3">My Transaction</h3>
          </div>
          {chart.map((item, index) => (
            <div className="d-flex" key={item.id}>
              <div className="mt-2">
                <Row className="p-4 mt-2" style={{ backgroundColor: "#F6E6DA" }}>
                  <Container className="d-flex gap-5 justify-content-betwen">
                    <div className="d-flex gap-2">
                      <div>
                        <img className="img-fluid" src={ProductOne} style={{ height: "180px", width: "170px" }} />
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <div>
                          <p className="fs-5 m-0">{item.namaProduct}</p>
                          <p className="m-0">Saturday, 5 March 2020</p>
                        </div>
                        <div>
                          <p className="mt-2 mb-0">Price : Rp.{item.priceProduct}</p>
                          <p className="m-0">Qty : {item.quantity}</p>
                          <p>Sub Total : {trans.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img src={Icon} style={{ width: "120px" }} />
                      </div>
                      <div className="mt-3 d-flex justify-content-center">
                        <img src={Qr} />
                      </div>
                      <div className="mt-3" style={{ backgroundColor: "#613D2B" }}>
                        <p className="p-2" style={{ color: "white" }}>
                          Waiting Approve
                        </p>
                      </div>
                    </div>
                  </Container>
                </Row>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DetailTransaction;
