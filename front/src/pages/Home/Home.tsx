import React from "react";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";

const Home: React.FC = () => (
  <main className={styles.main}>
    <h2 className={styles.title}>Componentes recientes</h2>
    <div className={styles.cardsContainer}>
      <Card
        title="GPU RTX 4090"
        description="Una de las tarjetas gráficas más potentes del mercado."
      />
      <Card
        title="Intel Core i9"
        description="Procesador de última generación con alto rendimiento."
      />
      <Card
        title="Placa madre ASUS"
        description="Compatibilidad y estabilidad para tus componentes."
      />
      <Card
        title="GPU RTX 4090"
        description="Una de las tarjetas gráficas más potentes del mercado."
      />
      <Card
        title="Intel Core i9"
        description="Procesador de última generación con alto rendimiento."
      />
      <Card
        title="Placa madre ASUS"
        description="Compatibilidad y estabilidad para tus componentes."
      />
    </div>
  </main>
);

export default Home;
