/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { role } = useSelector((state: any) => state.auth);

  return (
    <>{role === "admin" ? <Outlet /> : <Navigate to={"/all/products"} />}</>
  );
};

export default AdminRoute;
