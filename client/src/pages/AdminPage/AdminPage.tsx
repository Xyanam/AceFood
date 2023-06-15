import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AdminPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuth && user.role !== "admin") {
      navigate("/");
    }
  }, [isAuth]);

  return <div>AdminPage</div>;
};

export default AdminPage;
