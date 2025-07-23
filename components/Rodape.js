// components/Rodape.jsx

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Rodape.module.css';

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.colunasRodape}>
        <div className={styles.colunaRodape}>
          <Link href="/">
            <Image
              src="/images/rodape.png"
              alt="Logo da Empresa"
              width={460} // Manter esses valores para otimização do Next.js
              height={120} // Manter esses valores para otimização do Next.js
              className={styles.logoPrincipal} // ADICIONADO: Nova classe CSS
            />
          </Link>

          <div className={styles.socialIcons}>
            <a href="URL_DO_SEU_TWITTER" target="_blank" rel="noopener noreferrer">
              <Image src="/images/x.png" alt="Twitter" width={30} height={30} />
            </a>
            <a href="URL_DO_SEU_YOUTUBE" target="_blank" rel="noopener noreferrer">
              <Image src="/images/ytb.png" alt="YouTube" width={30} height={30} />
            </a>
            <a href="URL_DO_SEU_WHATSAPP" target="_blank" rel="noopener noreferrer">
              <Image src="/images/zap.png" alt="WhatsApp" width={30} height={30} />
            </a>
            <a href="URL_DO_SEU_INSTAGRAM" target="_blank" rel="noopener noreferrer">
              <Image src="/images/insta.png" alt="Instagram" width={30} height={30} />
            </a>
            <a href="URL_DO_SEU_FACEBOOK" target="_blank" rel="noopener noreferrer">
              <Image src="/images/face.png" alt="Facebook" width={30} height={30} />
            </a>
          </div>
        </div>

        <div className={styles.linhaVertical1}></div>

        <div className={styles.colunaRodape}>
          <h3>PÁGINAS</h3>
          <ul>
            <li>
              <Link href="/servicos">Serviços</Link>
            </li>
            <li>
              <Link href="/sobre">Nossa História</Link>
            </li>
            <li>
              <Link href="/hoteis">Hotéis</Link>
            </li>
            <li>
              <Link href="/parques-tematicos">Parques Temáticos</Link>
            </li>
            <li>
              <Link href="/projetos">Portfólio</Link>
            </li>
            <li>
              <Link href="/sobre">Quem somos</Link>
            </li>
          </ul>
        </div>

        <div className={styles.linhaVertical2}></div>

        <div className={styles.colunaRodape2}>
          <h3>CONTATO</h3>
          <p className={styles.emailSamuel}>samuelvidal@edenss.com.br</p>
          <p className={styles.emailSusi}> susi@edenss.com.br</p>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;