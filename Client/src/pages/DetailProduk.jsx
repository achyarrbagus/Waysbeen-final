import { Container, Row, Col } from "react-bootstrap";
// import data from "../assets/data.json";
import "../styles.css";
import { Link, useParams } from "react-router-dom";
import { ContextGlobal } from "../assets/context/Context";
import { useContext, useEffect, useState } from "react";
import produk1 from "../assets/produk-3.png";
import { useNavigate } from "react-router-dom";

//

const DetailProduk = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id);
  const { kumpulanState } = useContext(ContextGlobal);
  const { state, setState, chartData, setChartData, stateQuantity, setStateQuantity } = kumpulanState;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("NEWPRODUCT"));
    const foundId = data.find((item) => item.id === id);
    setQuantity();
    setProduct(foundId);
  }, []);
  //

  const setQuantity = () => {
    const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
    if (chartData.length != 0) {
      const quantity = chartData.map((item) => item.quantity);
      let result = quantity.reduce((sum, quantity) => {
        return sum + quantity;
      });
      console.log(result);

      setStateQuantity(result);
    }
  };

  //
  const addChart = () => {
    const newChart = {
      namaProduct: product.nameProduct,
      priceProduct: product.priceProduct,
      id: product.id,
      descriptionProduct: product.descriptionProduct,
      Image: "https://seeklogo.com/images/K/kapal-api-logo-BDA931D774-seeklogo.com.png",
    };
    // setQuantity();
    // navigate("/");

    if (chartData === null) {
      newChart.quantity = 1;
      const newChartJson = JSON.stringify([newChart]);
      localStorage.setItem("CHARTDATA", newChartJson);
    } else {
      const indexChart = chartData.findIndex((e) => e.id === id);
      // console.log(indexChart);

      if (indexChart === -1) {
        newChart.quantity = 1;
        chartData.push(newChart);

        const chartDataJson = JSON.stringify(chartData);
        localStorage.setItem("CHARTDATA", chartDataJson);
      } else {
        chartData[indexChart].quantity += 1;

        const chartDataJson = JSON.stringify(chartData);
        localStorage.setItem("CHARTDATA", chartDataJson);
      }
      const chartDataJson = JSON.stringify(chartData);
      localStorage.setItem("CHARTDATA", chartDataJson);
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Container>
      <Row style={{ marginTop: "150px", height: "70vh" }} className="justify-content-center d-flex gap-2">
        <Col md={4}>
          <img src={produk1} className="img-fluid" />
        </Col>
        <Col md={6} className="py-5">
          <p className="openSans fs-1">{product.nameProduct}</p>
          <p className="fs-5">{product.stock}</p>
          <p className="fs-5">{product.descriptionProduct}</p>
          <h2 className="text-end mt-5" style={{ color: "#974A4A" }}>
            Rp. {product.priceProduct}
          </h2>
          <button
            style={{ width: "100%", height: "40px", borderRadius: "5px", color: "white", background: "#613D2B" }}
            className=""
            onClick={addChart}
          >
            Add Chart
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProduk;
