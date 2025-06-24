import React from 'react';
import styles from '../styles/MembroEquipe.module.css';

function MembroEquipe() {
  const membros = [

    {
    nome: "Susi",
    cargo: "Arquiteta Especialista em Hotelaria e Entretenimento",
    imagem: "/images/Susi.png", 
    bio: "Formada em Arquitetura e Urbanismo, com pós-graduação em Arquitetura Hoteleira e cursando MBA em Arquitetura Hoteleira, Susi possui ampla experiência em projetos de atrações aquáticas, parques e destinos de lazer familiar. Seu conhecimento abrange o design de produtos para hotéis, pousadas e parques aquáticos, enriquecido por viagens ao redor do mundo, que lhe deram uma visão inovadora do setor. Na Edenss, sua missão é criar experiências únicas e inesquecíveis, projetando ambientes que encantam, conectam e transformam sonhos em realidade.",
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
