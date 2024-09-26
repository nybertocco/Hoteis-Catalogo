import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro-hotel.css";

export default function CadastroHotel() {
  const [nome, setNome] = useState("");
  const [img, setImg] = useState("");
  const [estrelas, setEstrelas] = useState(1);
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newHotel = {
      id: Date.now(),
      nome,
      img,
      estrelas: estrelas || 5,
      cidade,
      estado,
      preco,
      descricao,
    };

    const existingHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const updatedHotels = [...existingHotels, newHotel];
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));

    navigate("/");
  };

  return (
    <div className="cadastro-hotel">
      <h2>Cadastro de Hotel</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome do Hotel</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>URL da Imagem</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estrelas</label>
          <select
            value={estrelas}
            onChange={(e) => setEstrelas(parseInt(e.target.value))} // Certifique-se de que o valor seja um número
            required
          >
            <option value="1">1 estrela</option>
            <option value="2">2 estrelas</option>
            <option value="3">3 estrelas</option>
            <option value="4">4 estrelas</option>
            <option value="5">5 estrelas</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cidade</label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço por Noite (R$)</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Cadastrar Hotel
        </button>
      </form>
    </div>
  );
}
