import Home from "./pages/home";
import { AppProvider } from "./context/app-context";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Bookmarks from "./pages/bookmarks";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
