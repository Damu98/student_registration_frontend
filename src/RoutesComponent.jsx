import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";

import StudentregistrationDemo from "./Demo";


const RoutesComponent = () => {
  return (
   
        <Router >
          <Routes>
            <Route path="/studentregistrationdemo" element={<StudentregistrationDemo></StudentregistrationDemo>}></Route>
            
           
          </Routes>
          {/* <GetCommonMasterDetails /> */}
        </Router>
     
  )
}; 
export default RoutesComponent;
