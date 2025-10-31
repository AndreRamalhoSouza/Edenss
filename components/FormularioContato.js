// components/FormularioContato.js
import React from 'react';
import styles from '../styles/FormularioContato.module.css';

function FormularioContato() {
  return (
    <section className={styles.secaoFormulario}>
      <h2 className={styles.tituloFormulario}>FALE CONOSCO</h2>
      {/* CONFIGURAÇÃO SEM BACKEND: 
        Usamos o Formspree com o seu endpoint e o método POST. 
      */}
      <form 
        className={styles.formulario}
        // SEU ENDPOINT FORMULÁRIO ESTÁ AQUI:
        action="https://formspree.io/f/mgvpndje" 
        method="POST"
      >
        <div className={styles.campo}>
          <label htmlFor="nome" className={styles.labelCampo}>NOME</label>
          {/* O atributo 'name' é crucial para o Formspree identificar o campo */}
          <input type="text" id="nome" name="nome" className={styles.inputCampo} placeholder="" required />
        </div>
        
        <div className={styles.campo}>
          <label htmlFor="email" className={styles.labelCampo}>EMAIL</label>
          {/* Usamos name="_replyto" para que você possa responder ao e-mail 
             diretamente no seu cliente de e-mail. */}
          <input type="email" id="email" name="_replyto" className={styles.inputCampo} placeholder="" required />
        </div>
        
        <div className={styles.campo}>
          <label htmlFor="telefone" className={styles.labelCampo}>TELEFONE</label>
          <input type="tel" id="telefone" name="telefone" className={styles.inputCampo} placeholder="" />
        </div>
        
        <div className={styles.campo}>
          <label htmlFor="mensagem" className={styles.labelCampo}>MENSAGEM</label>
          <textarea id="mensagem" name="mensagem" className={`${styles.inputCampo} ${styles.textAreaCampo}`} rows="5" placeholder="" required></textarea>
        </div>
        
        {/* Campo oculto que redireciona o usuário após o envio. 
           Opcional: Mude a 'value' para a URL da sua página de sucesso. */}
        <input type="hidden" name="_next" value="URL_DA_SUA_PAGINA_DE_SUCESSO" />
        
        <button type="submit" className={styles.botaoEnviar}>ENVIAR</button>
      </form>
    </section>
  );
}

export default FormularioContato;