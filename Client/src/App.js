import LandingPage from "./pages/LandingPage";
import DetailProduk from "./pages/DetailProduk";
import ChartProduk from "./pages/ChartProduk";
import AdminDhsbord from "./pages/AdminDhsbord";
import AddProduct from "./pages/AddProduct";
import ListProduk from "./pages/ListProduk";
import DetailTransaction from "./pages/DetailTransaction";
import EditProduct from "./pages/EditProduct";
import { ContextProvider } from "./assets/context/Context";
import { ContextGlobal } from "./assets/context/Context";
import { useContext, useEffect } from "react";
import SharedLayout from "./Components/SharedLayout";
import PrivateRoute from "./Components/PrivateRoutes";

import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

//

function App() {
  return (
    <>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/admin" element={<AdminDhsbord />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/list-product" element={<ListProduk />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
              </Route>

              <Route index element={<LandingPage />} />
              <Route path="/detail-product/:id" element={<DetailProduk />} />
              <Route path="/chart-product" element={<ChartProduk />} />
              <Route path="/detail-transaction" element={<DetailTransaction />} />
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
}

export default App;
