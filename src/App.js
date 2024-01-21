import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoComponent from "./component/TodoComponent";
import React from "react";
import ReactDOM from "react-dom/client";
import Error from "./component/Error";
import store from "./utils/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <TodoComponent />
      </Provider>
    );
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
