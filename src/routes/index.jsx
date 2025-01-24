import MainPage from "../MainPage";
import Students from "../MainPage/Students";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: MainPage,
    chilren: [
      {
        path: "",
        element: Students,
      },
    ],
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.chilren) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.chilren.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
