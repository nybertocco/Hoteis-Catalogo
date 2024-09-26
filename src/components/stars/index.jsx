import "./stars.css";

export default function Stars({ count }) {
  let stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);
  }
  return <div>{stars}</div>;
}
