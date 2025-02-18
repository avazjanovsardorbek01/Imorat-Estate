import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { useState, useEffect } from "react";
import Loader from "./components/loading/loader";
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      <Header />
      {loading ? <Loader /> : <Outlet />}
      <Footer />
    </>
  );
};

export default App;
