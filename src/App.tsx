import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Taskpage } from "./pages/TaskPage";
import { useSidebarmenuStore } from "./logic/SidebarMenu";
import { Layout } from "./pages/Layout";
import HomePage from "./pages/HomePage";

function App() {
  const { routes } = useSidebarmenuStore(
    (state) => state
  );
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<HomePage/>} />
            {
              routes.map((route) => {
                return <Route key={route.text} path={`:taskId`} element={<Taskpage />} />
              })
            }
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
