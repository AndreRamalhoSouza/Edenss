// components/Rodape.js
import Link from 'next/link';
import styles from '../styles/Rodape.module.css'; // Crie este módulo CSS

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.colunasRodape}>
        <div className={styles.colunaRodape}>
          <h3><span className={styles.edenn}>ĒDEN</span><span className={styles.ss}>SS</span></h3>
          {/* Adicione ícones/links de redes sociais aqui */}
        </div>
        <p className={styles.slogan}>Projetando experiências</p>
        <div className={styles.colunaRodape}>
          <h3>PÁGINAS</h3>
          <ul>
            <li><Link href="/servicos">Serviços</Link></li>
            <li><Link href="/sobre">Nossa História</Link></li>
            <li><Link href="/hoteis">Hotéis</Link></li> {/* Assumindo páginas dedicadas */}
            <li><Link href="/parques-tematicos">Parques Temáticos</Link></li> {/* Assumindo páginas dedicadas */}
            <li><Link href="/projetos">Portfólio</Link></li>
            <li><Link href="/sobre">Quem somos</Link></li>
          </ul>
        </div>
        <div className={styles.colunaRodape2}>
          <h3>CONTATO</h3>
          <p className={styles.emailSamuel}>Email: samuelvidal@edenss.com.br</p>
  <p className={styles.emailSusi}>Email: susi@edenss.com.br</p>
          {/* Adicione número de telefone se disponível */}
        </div>
      </div>
      {/* Adicione informações de direitos autorais */}
    </footer>
  );
}

export default Rodape;