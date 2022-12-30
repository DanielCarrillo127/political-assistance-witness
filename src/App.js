import React from "react";
import { RoutesTree } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import { UserContext } from "./context/userContext";

function App() {
  return (
    <>
      <UserContext>
        <RoutesTree />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </UserContext>

    </>
  );
}

export default App;
