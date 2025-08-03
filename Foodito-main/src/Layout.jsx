import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Fooditems from "./components/Fooditems";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

// import Items from "./components/Items";

function Layout(){
  return (
<>
    
    <Navbar/>
    <Outlet/>
    </>


  )
}
export default Layout;



