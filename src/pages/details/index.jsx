import { useEffect, useState } from "react";
import Header from "../../components/header";
import "./details.css";

export default function Details() {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const selectedHotel = localStorage.getItem("selectedHotel");
    if (selectedHotel) {
      setHotel(JSON.parse(selectedHotel));
    }
  }, []);

  if (!hotel) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <Header />

      <div className="content">
        <div>
          <img src={hotel.img} alt={hotel.nome} />
        </div>

        <div className="information">
          <h4>{hotel.nome}</h4>
          <p>
            {hotel.cidade}, {hotel.estado}
          </p>
          <span>R${hotel.preco} por noite</span>
          <p>{hotel.descricao}</p>
          <span>{hotel.estrelas} estrelas</span>
        </div>
      </div>
    </div>
  );
}
