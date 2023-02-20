import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Messenger from "./components/Messenger";
import SwipeContainer from "./components/SwipeContainer";
import { AuthContext } from "./context/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";

const SecuredRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  if (!state.user?.token) return <Navigate to={"/"} />;
  return children;
};
const App = () => {
  const { state } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: state.user ? <Dashboard /> : <Home />,
    },
    {
      path: "/onboarding",
      element: (
        <SecuredRoute>
          <OnBoarding />
        </SecuredRoute>
      ),
    },
    {
      path: "dashboard",
      element: (
        <SecuredRoute>
          <Dashboard />
        </SecuredRoute>
      ),
      children: [
        {
          path: "",
          element: <SwipeContainer />,
        },
        {
          path: "chats/:id",
          element: <Messenger />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
