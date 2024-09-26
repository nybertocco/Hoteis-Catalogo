import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "./home.css";

const hotels = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&auto=format&fit=crop&q=60",
    nome: "Hotel Ibiza",
    cidade: "Ibiza",
    estado: "Espanha",
    preco: 900,
    estrelas: 5,
    descricao: "Desconto de 15% na diária em dias de semana.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1692553398021-d170c329f7e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzAzfHxob3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
    nome: "Hotel Miami",
    cidade: "Miami, Florida",
    estado: "Estados Unidos",
    preco: 700,
    estrelas: 5,
    descricao: "Bela vista a beira mar, incluso café da manha, almoço e janta.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1702100084482-89baf24bab3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI0fHxob3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
    nome: "Hotel Aires",
    cidade: "Buenos Aires",
    estado: "Argentina",
    preco: 600,
    estrelas: 5,
    descricao: "Hotel luxuoso com suítes sensasionais.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ5fHxob3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
    nome: "Hotel Bali",
    cidade: "Bali",
    estado: "Indonésia",
    preco: 800,
    estrelas: 5,
    descricao:
      "Área de piscina e spa, academia e open bar. Venha relaxar e curtir as férias!.",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1568229988520-4bc288da81f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ3fHxob3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
    nome: "Hotel Roma",
    cidade: "Roma",
    estado: "Itália",
    preco: 1000,
    estrelas: 5,
    descricao:
      "Piscina na varanda, festas de final de semana e um resort incrivel, venha conhecer!.",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1565822629979-5fce9ebf704e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjUxfHxob3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
    nome: "Hotel Koh Tao",
    cidade: "Koh tao",
    estado: "Tailândia",
    preco: 750,
    estrelas: 5,
    descricao: "Paz, relaxamento e diversão.",
  },
];

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels")) || [];
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedTheme = localStorage.getItem("theme") || "light";
    setHotels(storedHotels);
    setFavorites(storedFavorites);
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const goToDetails = (hotel) => {
    localStorage.setItem("selectedHotel", JSON.stringify(hotel));
    navigate("/detalhes");
  };

  const goToEdit = (id) => {
    navigate(`/editar/${id}`);
  };

  const deleteHotel = (id) => {
    const updatedHotels = hotels.filter((hotel) => hotel.id !== id);
    setHotels(updatedHotels);
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
  };

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortCriteria === "preco") {
      return a.preco - b.preco;
    } else if (sortCriteria === "estrelas") {
      return b.estrelas - a.estrelas;
    }
    return 0;
  });

  const hotelsToDisplay = showFavorites
    ? sortedHotels.filter((hotel) => favorites.includes(hotel.id))
    : sortedHotels;

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Hoteis</h2>

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "Dark-mode" : "Light-mode"}
        </button>

        <input
          type="text"
          placeholder="Pesquisar hotel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="sort-select"
        >
          <option value="">Ordenar por...</option>
          <option value="preco">Preço</option>
          <option value="estrelas">Classificação (Estrelas)</option>
        </select>

        <button
          className="favorites-toggle"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Mostrar Todos" : "Mostrar Favoritos"}
        </button>

        <div className="container-list">
          {hotelsToDisplay.length > 0 ? (
            hotelsToDisplay.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-card"
                onClick={() => goToDetails(hotel)}
              >
                <img src={hotel.img} alt={hotel.nome} />
                <h4>{hotel.nome}</h4>
                <p>
                  {hotel.cidade}, {hotel.estado}
                </p>
                <span>R${hotel.preco} por noite</span>
                <div className="stars">
                  {[...Array(hotel.estrelas)].map((_, index) => (
                    <span key={index} className="star">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - hotel.estrelas)].map((_, index) => (
                    <span key={index + hotel.estrelas} className="star empty">
                      ★
                    </span>
                  ))}
                </div>
                <div className="hotel-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDetails(hotel);
                    }}
                    className="details-button"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToEdit(hotel.id);
                    }}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHotel(hotel.id);
                    }}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotel.id);
                    }}
                    className={`favorite-button ${
                      favorites.includes(hotel.id) ? "favorited" : ""
                    }`}
                  >
                    {favorites.includes(hotel.id) ? "★" : "☆"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum hotel encontrado.</p>
          )}
        </div>
      </div>

      <button
        className="float-button"
        onClick={() => navigate("/cadastro-hotel")}
      >
        +
      </button>
    </div>
  );
}
