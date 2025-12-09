import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import ThemeToggle from "../components/ThemeToggle";

const RootLayout = () => {
  return (
    <>
      {/* <ThemeToggle></ThemeToggle> */}
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
};

export default RootLayout;
