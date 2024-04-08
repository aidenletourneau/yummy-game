
const Card = (props) => {
  
  return(
    <div className="card" onClick={props.onClick}>
      <div className="picture-container"><img  src={props.picture} default-src="" alt="food" className="card-picture"/></div>
      <div className='card-title'><p className="title-text">{props.title}</p></div>
      <div className="card-description">
        <p>{props.description}</p>
        <span>★ </span>{props.rating}
        <p><a target="_blank" rel="noreferrer" href={props.menu}>Menu</a></p>
      </div>
    </div>
  )
}

export default Card;