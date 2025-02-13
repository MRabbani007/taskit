import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter basename="/taskit/">
    <App />
  </BrowserRouter>
  //   {/* <HashRouter basename="/">
  //   </HashRouter> */}
  // {/* </React.StrictMode> */}
);
