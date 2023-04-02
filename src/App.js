import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import List2 from "./pages/list/List2";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { userInputs,productInputs } from "./formSource";
import Signup from "./pages/login/Signup";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
 

  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          
        <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="users">
              <Route index element={<List/>}/>
              <Route path=":userId" element={<Single/>}/>
              <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/>
            </Route>
            <Route path="products">
              <Route index element={<List/>}/>
              <Route path=":productId" element={<Single/>}/>
              <Route path="new" element={<New inputs={productInputs} title="Add"/>}/>
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
