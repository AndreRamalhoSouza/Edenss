// components/CartaoServico.js

import Image from 'next/image'; // <--- Garanta que Image está importado
import styles from '../styles/CartaoServico.module.css';

const CartaoServico = ({ servico }) => {
  return (
    <div className={styles.card} style={{ backgroundColor: servico.color }}>
      <div className={styles.iconWrapper}>
        {/* Renderiza o componente Image apenas se 'servico.icon' existir */}
        {servico.icon && (
          <Image
            src={servico.icon} // Caminho do ícone vindo dos dados
            alt={servico.titulo} // Texto alternativo para acessibilidade
            width={80} // Largura desejada para o ícone
            height={80} // Altura desejada para o ícone
            // Se os ícones forem SVGs e você quiser que eles se dimensionem, considere 'layout="intrinsic"' ou 'layout="fixed"'
            // e ajuste width/height para o tamanho do SVG.
            // Para imagens PNG, width e height são importantes para otimização do Next.js.
            className={styles.serviceIcon} // Nova classe para estilização específica da imagem do ícone
          />
        )}
        {/* Remova ou comente o placeholderIcon se você tiver ícones para todos */}
        {/* {!servico.icon && <div className={styles.placeholderIcon}></div>} */}
      </div>
      <h3 className={styles.titulo}>{servico.titulo}</h3>
    </div>
  );
};

export default CartaoServico;