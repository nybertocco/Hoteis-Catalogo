import { Link } from "react-router-dom";

import "./product.css";
import Stars from "../stars";

export default function Product(props) {
  return (
    <Link to="/detalhes">
      <div className="card">
        <h4>{props.produto.nome}</h4>
        <img src={props.produto.img} />
        <p>{props.produto.cidade}</p>
        <p>{props.produto.estado}</p>
        <span>R${props.produto.preco}</span>
        <Stars count={props.produto.estrelas} />
      </div>
    </Link>
  );
}
