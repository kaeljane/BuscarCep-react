import React, { useState } from 'react';

const AddressForm = () => {
  const [address, setAddress] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    uf: '',
    localidade: ''
  });

  // Função para buscar o CEP na API
  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert("CEP não encontrado.");
          return;
        }

        // Atualiza os campos com o que a API retornou
        setAddress((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf
        }));
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Address</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <input
          name="cep"
          placeholder="CEP"
          value={address.cep}
          onChange={handleChange}
          onBlur={handleCepBlur} // Dispara a busca ao sair do campo
        />

        <input
          name="logradouro"
          placeholder="Rua/Avenida"
          value={address.logradouro}
          onChange={handleChange}
        />

        <input
          name="numero"
          placeholder="Número"
          value={address.numero}
          onChange={handleChange}
        />

        <input
          name="bairro"
          placeholder="Bairro"
          value={address.bairro}
          onChange={handleChange}
        />

        <input
          name="uf"
          placeholder="Estado (UF)"
          value={address.uf}
          onChange={handleChange}
        />

        <input
          name="localidade"
          placeholder="Cidade"
          value={address.localidade}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AddressForm;