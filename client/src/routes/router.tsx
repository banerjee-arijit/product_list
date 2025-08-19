import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Homepage from "../pages/Homepage";
import CreateproductPage from "../pages/CreateproductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/create_product",
        element: <CreateproductPage />,
      },
    ],
  },
]);

export default router;
