import styles from '../styles/CartaoDepoimento.module.css';

function CartaoDepoimento({ depoimento }) {
  return (
    <div className={styles.cartao}>
     
      {depoimento.imagemUrl && (
        <img
          src={depoimento.imagemUrl}
          alt={`Foto de ${depoimento.nome}`} 
          className={styles.imagemDepoimento} 
        />
      )}
     <p className={styles.citacao}>&quot;{depoimento.citacao}&quot;</p>

      <p className={styles.autor}>- {depoimento.nome}</p>
      <p className={styles.empresa}>{depoimento.titulo}, {depoimento.empresa}</p>
    </div>
  );
}

export default CartaoDepoimento;