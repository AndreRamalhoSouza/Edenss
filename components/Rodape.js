// components/Rodape.jsx

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Rodape.module.css';

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.colunasRodape}>
        <div className={styles.colunaRodape}>
          {/* Se a logo deve levar para o topo da página, pode ser href="/" ou href="#top" */}
          <Link href="/">
            <Image
              src="/images/rodape.png"
              alt="Logo da Empresa"
              width={460} // Manter esses valores para otimização do Next.js
              height={120} // Manter esses valores para otimização do Next.js
              className={styles.logoPrincipal}
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

        <div className={styles.colunaRodape}>
          <h3>PÁGINAS</h3>
          <ul>
            <li>
              {/* Aponta para a seção com id="servicos" no index.js */}
              <Link href="#servicos">Serviços</Link>
            </li>
            <li>
              {/* Aponta para a seção com id="nossa-historia" no index.js */}
              <Link href="#nossa-historia">Nossa História</Link>
            </li>
            {/* Estes links abaixo precisam que você adicione as seções correspondentes no index.js ou decida se são necessários para uma one-page */}
            <li>
              {/* Se "Hotéis" e "Parques Temáticos" são parte do "Portfólio" ou seções separadas, ajuste o ID conforme necessário. */}
              {/* Por exemplo, se forem parte do portfólio, podem apontar para #projetos */}
              <Link href="#projetos">Hotéis</Link> {/* AJUSTE AQUI SE TIVER UMA SEÇÃO ESPECÍFICA */}
            </li>
            <li>
              <Link href="#projetos">Parques Temáticos</Link> {/* AJUSTE AQUI SE TIVER UMA SEÇÃO ESPECÍFICA */}
            </li>
            <li>
              {/* Aponta para a seção com id="projetos" no index.js */}
              <Link href="#projetos">Portfólio</Link>
            </li>
            <li>
              {/* Aponta para a seção com id="nossa-historia" no index.js */}
              <Link href="#nossa-historia">Quem somos</Link>
            </li>
          </ul>
        </div>

        <div className={styles.colunaRodape2}>
          <h3>CONTATO</h3>
          <p className={styles.emailSamuel}>samuelvidal@edenss.com.br</p>
          <p className={styles.emailSusi}> susi@edenss.com.br</p>
          {/* Adicione um link para a seção de contato se houver uma */}
         
        </div>
      </div>
    </footer>
  );
}

export default Rodape;