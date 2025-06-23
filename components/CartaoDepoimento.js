import styles from '../styles/CartaoDepoimento.module.css';

function CartaoDepoimento({ depoimento }) {
  return (
    <div className={styles.cartao}>
      {/* Conditionally render the image if imagemUrl exists */}
      {depoimento.imagemUrl && (
        <img
          src={depoimento.imagemUrl}
          alt={`Foto de ${depoimento.nome}`} // Good for accessibility
          className={styles.imagemDepoimento} // Add a class for styling
        />
      )}
      <p className={styles.citacao}>"{depoimento.citacao}"</p>
      <p className={styles.autor}>- {depoimento.nome}</p>
      <p className={styles.empresa}>{depoimento.titulo}, {depoimento.empresa}</p>
    </div>
  );
}

export default CartaoDepoimento;