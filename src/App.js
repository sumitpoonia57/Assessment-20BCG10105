import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./LoginRegister/Index";
import Navbar from "./Navbar";
import Favourites from "./favourites";
import Product from "./Products/Product.js";
import Products from "./Products";
import Cart from "./cart";

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ backgroundColor: "#e5edf6" }}>
      <Navbar />
      <Routes>
        <Route
          path="Assessment/"
          element={
            <LoginRegister
              userData={userData}
              setUserData={setUserData}
            />
          }
        />
        {userData.length > 0 ? (
          <>
            <Route path="Assessment/products" element={<Products />} />
            <Route path="Assessment/favourites" element={<Favourites />} />
            <Route
              path="Assessment/products/product"
              element={<Product />}
            />
            <Route path="Assessment/cart" element={<Cart />} />
          </>
        ) : (
          // If user array is empty, navigate to login page
          <Navigate to="Assessment/" />
        )}
      </Routes>
    </div>
  );
}

export default App;
