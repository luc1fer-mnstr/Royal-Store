import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginForm } from "@/components/login-form";
import InputForm from "@/pages/InputForm";
import Table from "@/pages/Table";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/form",
    element: <InputForm />,
  },
  {
    path: "/table",
    element: <Table />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
