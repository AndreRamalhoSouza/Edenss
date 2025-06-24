import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroEquipe() {
  const membros = [
   {
    nome: "Samuel",
    cargo: "Arquiteto, Gestor e Criador de Espaços Extraordinários",
    imagem: "/images/Samuel.png", 
    bio: "Arquiteto urbanista desde 2014, formado pela PUC-Campinas, com especializações em Administração e Gestão Empresarial pela FGV. Com experiência em incorporação imobiliária, gerenciamento de obras, projetos arquitetônicos, paisagísticos e de design, busca criar espaços que vão além da funcionalidade. Sócio de Edenss, lidera uma equipe focada em desenvolver hotéis e parques acolhedores, unindo sustentabilidade, inovação e bem-estar. Acredita no poder transformador da arquitetura para criar experiências memoráveis e um mundo melhor."
  },
   
  ];

  return (
    <>
      {membros.map((membro, index) => {
        const nomeCss = membro.nome.toLowerCase();
        const imagemDinamicaClass = `${styles.imagemMembro}-${nomeCss}`;
        const textoDinamicaClass = `${styles.textoMembro}-${nomeCss}`;
        const membroDetalheDinamicaClass = `${styles.membroDetalhe}-${nomeCss}`;

        return (
          <div
            key={index}
            className={`${styles.membroDetalhe} ${membroDetalheDinamicaClass}`}
          >
            <img
              src={membro.imagem}
              alt={membro.nome}
              className={`${styles.imagemMembro} ${imagemDinamicaClass}`}
            />
            <div className={`${styles.textoMembro} ${textoDinamicaClass}`}>
              <h3>{membro.nome}</h3>
              <h4>{membro.cargo}</h4>
              <p>{membro.bio}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MembroEquipe;
