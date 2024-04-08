

 const Title = (props) => {

  function handleClick(){
    props.appState(true)
  }

  return(
    <div className="title">
      <h1>The Yummy Yummy Game!!</h1>
      <button onClick={handleClick} className="play-button">Play</button>
    </div>
  );
}

export default Title;