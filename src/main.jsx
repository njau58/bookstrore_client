
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckOut from "./components/pages/CheckOut";
import Root from "./routes/root";
import ErrorPage from "./components/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "checkout/:bookId",
    element: <CheckOut />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <RouterProvider router={router} />

);
