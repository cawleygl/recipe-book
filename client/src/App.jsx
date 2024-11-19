import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import { Container } from "react-bootstrap";

export const AlertContext = createContext({
  pageAlert: [{
    message: "",
    variant: "",
    show: false,
  }],
  setPageAlert: () => {},
});

const App = () => {
  const [pageAlert, setPageAlert] = useState({
    message: "",
    variant: "",
    show: false,
  });

  useEffect(() => {
    console.log("pageAlert", pageAlert);
  }, [pageAlert]);

  return (
    <div className="w-full p-6">
      <AlertContext.Provider value={{ pageAlert, setPageAlert }}>
        <Navbar />
        <FlashMessage />
        <Container>
          <Outlet />
        </Container>
      </AlertContext.Provider>
    </div>
  );
};
export default App;
