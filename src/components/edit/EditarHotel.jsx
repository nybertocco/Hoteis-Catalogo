import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editar-hotel.css";

export default function EditarHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const existingHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const hotelToEdit = existingHotels.find(
      (hotel) => hotel.id === parseInt(id)
    );
    setHotel(hotelToEdit);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const updatedHotels = existingHotels.map((h) =>
      h.id === hotel.id ? hotel : h
    );
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));

    navigate("/");
  };

  if (!hotel) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="cadastro-hotel">
      <h2>Editar Hotel</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome do Hotel</label>
          <input
            type="text"
            value={hotel.nome}
            onChange={(e) => setHotel({ ...hotel, nome: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>URL da Imagem</label>
          <input
            type="text"
            value={hotel.img}
            onChange={(e) => setHotel({ ...hotel, img: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Estrelas</label>
          <input
            type="number"
            value={hotel.estrelas}
            onChange={(e) => setHotel({ ...hotel, estrelas: e.target.value })}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label>Cidade</label>
          <input
            type="text"
            value={hotel.cidade}
            onChange={(e) => setHotel({ ...hotel, cidade: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input
            type="text"
            value={hotel.estado}
            onChange={(e) => setHotel({ ...hotel, estado: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Preço por Noite (R$)</label>
          <input
            type="number"
            value={hotel.preco}
            onChange={(e) => setHotel({ ...hotel, preco: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={hotel.descricao}
            onChange={(e) => setHotel({ ...hotel, descricao: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
