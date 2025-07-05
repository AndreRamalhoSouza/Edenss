
import Link from 'next/link';
import Image from 'next/image'; // Importe o componente Image do Next.js
import styles from '../styles/Rodape.module.css'; // Crie este módulo CSS

function Rodape() {
 return (
 <footer className={styles.rodape}>
<div className={styles.colunasRodape}>
 {/* Primeira Coluna - Logo e Redes Sociais */}
 <div className={styles.colunaRodape}>
<h3><span className={styles.edenn}>ĒDEN</span><span className={styles.ss}>SS</span></h3>
<div className={styles.socialIcons}>
 <a href="https://edenss-beige.vercel.app/" target="_blank" rel="noopener noreferrer">
 <Image src="/images/x.png" alt="Twitter" width={30} height={30} />
 </a>
<a href="https://edenss-beige.vercel.app/" target="_blank" rel="noopener noreferrer">
 <Image src="/images/ytb.png" alt="YouTube" width={30} height={30} />
 </a>
 <a href="https://edenss-beige.vercel.app/" target="_blank" rel="noopener noreferrer">
 <Image src="/images/zap.png" alt="WhatsApp" width={30} height={30} />
 </a>
 <a href="https://edenss-beige.vercel.app/" target="_blank" rel="noopener noreferrer">
 <Image src="/images/insta.png" alt="Instagram" width={30} height={30} />
 </a>
 <a href="https://edenss-beige.vercel.app/" target="_blank" rel="noopener noreferrer">
 <Image src="/images/face.png" alt="Facebook" width={30} height={30} />
 </a>
</div>
 </div>

 {/* Linha Vertical 1 */}
{/* Posicione esta linha com CSS, baseando-se no container .colunasRodape */}
 <div className={styles.linhaVertical1}></div>

{/* O slogan não é uma coluna, então o movemos para fora da estrutura de colunas do flexbox */}
 <p className={styles.slogan}>Projetando experiências</p>

 {/* Segunda Coluna - Páginas */}
 <div className={styles.colunaRodape}> {/* Esta será a coluna de "Páginas" */}
 <h3>PÁGINAS</h3>
<ul>
 <li><Link href="/servicos">Serviços</Link></li>
 <li><Link href="/sobre">Nossa História</Link></li>
 <li><Link href="/portfolio">Hotéis</Link></li>
 <li><Link href="/portfolio">Parques Temáticos</Link></li>
 <li><Link href="/portfolio">Portfólio</Link></li>
 <li><Link href="/sobre">Quem somos</Link></li>
 </ul>
 </div>

 {/* Linha Vertical 2 */}
 {/* Posicione esta linha com CSS, baseando-se no container .colunasRodape */}
 <div className={styles.linhaVertical2}></div>

 {/* Coluna de Contato (colunaRodape2) */}
 {/* Mantenho o nome colunaRodape2 conforme seu código, mas ela também pode ser tratada como .colunaRodape para consistência */}
 <div className={styles.colunaRodape2}> 
 <h3>CONTATO</h3>
<p className={styles.emailSamuel}>Email: samuelvidal@edenss.com.br</p>
 <p className={styles.emailSusi}>Email: susi@edenss.com.br</p>
 </div>
 </div>
 </footer>
 );
}

export default Rodape;