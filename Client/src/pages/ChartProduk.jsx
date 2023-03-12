import { Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import produkOne from "../assets/produk-1.png";
import sampah from "../assets/Sampah.png";
import { useState } from "react";
import Order from "../assets/order.json";
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
// import ShippingModal from "../Components/ShippingModal";
import Swal from "sweetalert2";

const ChartProduk = () => {
  const { kumpulanState } = useContext(ContextGlobal);
  const { chartData, setChartData, stateQuantity, setStateQuantity, showModal, setShowModal } = kumpulanState;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // const setQuantity = () => {
  //   const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
  //   const quantity = chartData.map((item) => item.quantity);
  //   let result = quantity.reduce((sum, quantity) => {
  //     return sum + quantity;
  //   });
  //   setStateQuantity(result);
  // };

  // const datalocal = JSON.parse(localStorage.getItem("CHARTDATA"));
  // setData(datalocal);
  // // setQuantity();
  // console.log(stateQuantity);

  const totalPrice =
    data.length > 0 &&
    data.reduce((acc, item) => {
      return acc + item.priceProduct * item.quantity;
    }, 0);

  const totalQuantity =
    data.length > 0 &&
    data.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

  // let result = [];

  // let chartOrder = JSON.parse(localStorage.getItem("CHARTDATA"));
  // for (let x of chartOrder) {
  //   result.push(x.namaProduct);
  // }

  // const handlerPay = () => {
  //   const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
  //   const quantity = chartData.map((item) => item.quantity);
  //   const totalQty = quantity.reduce((sum, quantity) => {
  //     return sum + quantity;
  //   });
  //   setStateQuantity(totalQty);
  //   const myTrans = {
  //     totalQuantity: totalQuantity,
  //     totalPrice: totalPrice,
  //     product: result,
  //   };
  //   localStorage.setItem("MYTRANS", JSON.stringify(myTrans));
  //   console.log(result);
  //   setShowModal(true);
  // };

  const incrment = (index) => {
    const updateChart = [...data];
    updateChart[index].quantity += 1;
    setData(updateChart);
    localStorage.setItem("CHARTDATA", JSON.stringify(updateChart));
    window.dispatchEvent(new Event("storage"));
  };

  const dcrement = (item, index) => {
    const updateChart = [...data];
    updateChart[index].quantity = Math.max(1, item.quantity - 1);
    setData(updateChart);
    localStorage.setItem("CHARTDATA", JSON.stringify(updateChart));
    window.dispatchEvent(new Event("storage"));
  };

  const deleteItem = (index) => {
    setData(data.splice(index, 1));
    localStorage.setItem("CHARTDATA", JSON.stringify(data));
    window.location.reload();
    setStateQuantity();
    window.dispatchEvent(new Event("storage"));
    Swal.alert({
      icon: "success",
      title: "Add Product Success",
      timer: 1500,
    });
  };
  // fecthing data from local storage
  const dataChart = JSON.parse(localStorage.getItem("CHARTDATA"));
  useEffect(() => {
    setData(dataChart);
  }, []);

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: "100px" }}>
        <Col className="fs-3">My Chart</Col>
      </Row>
      <br />
      <Row>
        <Col>
          <p className="fs-5">Review Your Order</p>
        </Col>
      </Row>
      <Row>
        {data.map((item, index) => (
          <Col md={7}>
            <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
            <div className="p-3 d-flex justify-content-between gap-3">
              <div>
                <img width="70px" src={`http://localhost:5000/uploads/${item.Image}`} />
              </div>
              <div>
                <div>
                  <h1 className="fs-4">{item.namaProduct}</h1>
                </div>
                <div className="d-flex gap-2">
                  <button className="fs-5" style={{ border: "none" }}>
                    +
                  </button>
                  <h3 className="fs-5 p-1 " style={{ backgroundColor: "#F6E6DA" }}>
                    {item.quantity}
                  </h3>
                  <button className="fs-5" style={{ border: "none" }}>
                    -
                  </button>
                </div>
              </div>
              <div className="">
                <div>
                  <h5>Rp.{item.priceProduct}</h5>
                </div>
                <div className="d-flex justify-content-end pt-3">
                  <button
                    className=""
                    onClick={() => deleteItem(index)}
                    style={{ border: "none", backgroundColor: "rgba(255,255,255,0.5)" }}
                  >
                    <img src={sampah} />
                  </button>
                </div>
              </div>
            </div>
            <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          </Col>
        ))}

        <Col md={5} className="p-3">
          <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          <div className="d-flex justify-content-between py-3">
            <div>
              <div>
                <p>SubTotal</p>
              </div>
              <div>
                <p>{totalQuantity}</p>
              </div>
            </div>
            <div>
              <div>
                <p>{totalPrice}</p>
              </div>
              <div>
                <p>{totalPrice}</p>
              </div>
            </div>
          </div>
          <div style={{ height: "1px", width: "100%", backgroundColor: "#613D2B" }}></div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <p>total</p>
            </div>
            <div>
              <p>{totalPrice}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button style={{ backgroundColor: "#613D2B", width: "300px", color: "white", borderRadius: "5px" }}>Pay</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartProduk;
