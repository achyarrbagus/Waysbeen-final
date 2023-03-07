import { Container, Table, Button } from "react-bootstrap";
import AdminNav from "../Components/AdminNav";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Swal } from "sweetalert2";

function ListProduk() {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  const handlerToEditProduct = (index) => {
    const convert = JSON.stringify(listProduct[index]);
    localStorage.setItem("EDITPRODUCT", convert);
    navigate(`/edit-product/${index}`);
  };

  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = () => {
    const dataProduct = JSON.parse(localStorage.getItem("NEWPRODUCT"));
    setListProduct(dataProduct);
  };
  const deleteProduct = (index) => {
    // const dataProduct = JSON.parse(localStorage.getItem("NEWPRODUCT"));
    // dataProduct.splice(index, 1);
    // localStorage.setItem("NEWPRODUCT", JSON.stringify(dataProduct));
    // setListProduct(dataProduct);
    Swal.fire({
      icon: "success",
      title: `Delete Product Success${index}`,
      timer: 1500,
    });
    console.log("hello world");
  };

  return (
    <Container style={{ marginTop: "200PX" }}>
      <Table className="mt-5">
        <thead>
          <tr style={{ backgroundColor: "#E5E5E5", color: "#000000" }}>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td></td>
              <td>{item.nameProduct}</td>
              <td>{item.stock}</td>
              <td>{item.priceProduct}</td>
              <td>{item.descriptionProduct}</td>
              <td className="d-flex gap-1">
                <Button className="btn-success" onClick={() => handlerToEditProduct(index)}>
                  Update
                </Button>
                <Button className="btn-danger" onClick={() => deleteProduct(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListProduk;
