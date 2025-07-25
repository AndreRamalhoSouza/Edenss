import { useState } from 'react';
import styles from '../styles/FormularioContato.module.css'; // Crie este módulo CSS

function FormularioContato() {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosFormulario((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você normalmente enviaria os dados do formulário para um endpoint de API
    // Para um site estático simples, você pode usar um serviço como Formspree ou Netlify Forms
    console.log('Dados do formulário enviados:', dadosFormulario);
    alert('Mensagem enviada com sucesso!'); // Feedback básico
    setDadosFormulario({ nome: '', email: '', telefone: '', mensagem: '' }); // Limpar formulário
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.grupoFormulario}>
        <label htmlFor="nome">NOME</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={dadosFormulario.nome}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.grupoFormulario}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          value={dadosFormulario.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.grupoFormulario}>
        <label htmlFor="telefone">TELEFONE</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={dadosFormulario.telefone}
          onChange={handleChange}
        />
      </div>
      <div className={styles.grupoFormulario}>
        <label htmlFor="mensagem">MENSAGEM</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={dadosFormulario.mensagem}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.botaoEnviar}>ENVIAR</button>
    </form>
  );
}

export default FormularioContato;