import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./services/router/Router";

const router = createBrowserRouter(routes);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
