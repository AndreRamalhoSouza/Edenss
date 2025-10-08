// components/CartaoServico.js

import Image from 'next/image'; 
import styles from '../styles/CartaoServico.module.css';

const CartaoServico = ({ servico }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: servico.color }}>
      <div className={styles.iconWrapper}>
        
        {servico.icon && (
          <Image
            src={servico.icon} 
            alt={servico.titulo} 
            width={80} 
            height={80} 
            
            
           
            className={styles.serviceIcon} 
          />
        )}
        
      </div>
      <h3 className={styles.titulo}>{servico.titulo}</h3>
    </div>
  );
};

export default CartaoServico;