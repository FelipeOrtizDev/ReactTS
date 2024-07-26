import React from "react";
import "./home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home: React.FC = () => {
    return (
    <div className="home">
      <Header />
      <main className="home_principal"></main>
      <Footer />
    </div>
    );
  };
  
export default Home;