import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Signup from
"./pages/Signup";

import Login from
"./pages/Login";

import Dashboard from
"./pages/Dashboard";

import { Toaster }
from "react-hot-toast";

import LandingPage from
"./pages/LandingPage";
function App() {

return (

<BrowserRouter>

<Toaster />

<Routes>

  <Route
    path="/"
    element={<LandingPage />}
  />

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/signup"
    element={<Signup />}
  />

  <Route
    path="/dashboard"
    element={<Dashboard />}
  />

</Routes>

</BrowserRouter>
);
}

export default App;