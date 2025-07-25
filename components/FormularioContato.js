// components/FormularioContato.js
import React from 'react';
import styles from '../styles/FormularioContato.module.css'; // Vamos criar este CSS

function FormularioContato() {
  return (
    <section className={styles.secaoFormulario}>
      <h2 className={styles.tituloFormulario}>FALE CONOSCO</h2> {/* Título do formulário */}
      <form className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="nome" className={styles.labelCampo}>NOME</label>
          <input type="text" id="nome" name="nome" className={styles.inputCampo} placeholder="" />
        </div>
        <div className={styles.campo}>
          <label htmlFor="email" className={styles.labelCampo}>EMAIL</label>
          <input type="email" id="email" name="email" className={styles.inputCampo} placeholder="" />
        </div>
        <div className={styles.campo}>
          <label htmlFor="telefone" className={styles.labelCampo}>TELEFONE</label>
          <input type="tel" id="telefone" name="telefone" className={styles.inputCampo} placeholder="" />
        </div>
        <div className={styles.campo}>
          <label htmlFor="mensagem" className={styles.labelCampo}>MENSAGEM</label>
          <textarea id="mensagem" name="mensagem" className={`${styles.inputCampo} ${styles.textAreaCampo}`} rows="5" placeholder=""></textarea>
        </div>
        <button type="submit" className={styles.botaoEnviar}>ENVIAR</button>
      </form>
    </section>
  );
}

export default FormularioContato;