import React from "react";
import "./home.css";
import Header from "../../components/Header/Header";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <main className="home_principal"></main>
    </div>
  );
};

export default Home;
