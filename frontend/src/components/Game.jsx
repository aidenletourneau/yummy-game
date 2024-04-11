import React, { useState, useEffect } from 'react';
import Card from './Card';
import confetti from 'canvas-confetti'


const Game = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [card1, setCard1] = useState()
  const [card2, setCard2] = useState()
  const [winner, setWinner] = useState();

  function getLocation(){
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          resolve([position.coords.latitude, position.coords.longitude])
        }, function(error) {
          reject();
        });
      } else {
        reject();
      }
    })  

  }

  const handleCard1 = () => {
    setRestaurants(currentRestaurants => {
      // Remove the last restaurant and capture the updated array
      const updatedRestaurants = currentRestaurants.slice(0, currentRestaurants.length - 1);
      
      // Assuming you want to update card2 to the new last restaurant
      // (after potentially modifying the restaurants array)
      if (updatedRestaurants.length > 0) {
        setCard2(updatedRestaurants[updatedRestaurants.length - 1]);
      }
      
      // Set the winner to the current card1
      setWinner(card1);
      
      // Return the updated restaurants array to update the state
      return updatedRestaurants;
    });
  };
  
  const handleCard2 = () => {
    setRestaurants(currentRestaurants => {
      const updateRestaurants = currentRestaurants.slice(1)
      
      if(updateRestaurants.length > 0){
        setCard1(updateRestaurants[0])
      }
      setWinner(card2)
      return updateRestaurants;//returns the update restaurants array that the setter function setRestaurants needs
    });
  }

  function handleClick(){
    props.appState(false)
  }

  useEffect(() => {
    const search = async () => {
      try {
        const [lat, lon] = await getLocation();
        const response = await fetch(`/api/restaurants/${lon}/${lat}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setRestaurants(json.businesses);
        if (json.businesses.length > 0) {
          setCard1(json.businesses[0]);
          setCard2(json.businesses[json.businesses.length - 1]);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    search();
  }, []);

  if (restaurants.length === 1){
    function confettiTime () {
      // Customize your confetti here
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 }
      });
    };
    confettiTime();
    return(
      <div className="win-page">
        <Card 
              picture={winner.image_url} 
              title={winner.name} 
              description={winner.categories[0].title || "Description not available"}
              rating={winner.rating || "Rating not available"}/>
        <button onClick={handleClick} className="play-button">Restart</button>
      </div>
    );
    
  }

  return (
    <div className='game'>
      {restaurants.length > 0 ? (
        <>
          <Card 
            card="1"
            onClick={handleCard1} 
            picture={card1.image_url} 
            title={card1.name} 
            description={card1.categories[0].title || "Description not available"}
            rating={card1.rating || "Rating not available"}
            menu={card1.attributes.menu_url}/>
          <h1 className='or'>OR</h1>
          <Card 
            card="2"
            onClick={handleCard2} 
            picture={card2.image_url} 
            title={card2.name} 
            description={card2.categories[0].title || "Description not available"}
            rating={card2.rating || "Rating not available"}
            menu={card2.attributes.menu_url}/>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default Game;
