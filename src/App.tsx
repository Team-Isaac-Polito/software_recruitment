import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSidebarmenuStore } from "./logic/SidebarMenu";
import { Layout, HomePage, Taskpage } from "./pages/";

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
