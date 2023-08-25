import './Card.scss';
import places from '../../data/places.json';
import { useContext, useEffect, useState } from 'react';
import Place from '../Place/Place'

import { Link } from 'react-router-dom';
import { Context } from '../App/App';


const Card = () => {
  const [visibleCards, setVisibleCards] = useState(12);
  const {setMenueVisible} = useContext(Context)
  const {resultAPI, setResultAPI} = useContext(Context);
  const loadMoreCards = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 12);
  };
  
  const {selectedCate} = useContext(Context);
  console.log(selectedCate);

  // useEffect(() => {
  //   fetch(`http://ludoviclebris-server.eddi.cloud/api/api/places/categories/${selectedCate}`)
  //   .then((response) => response.json())
  //     .then((data) => {
  //         setResultAPI(data);
  //     })},[selectedCate])

  return (
    <div className="cards-container" onClick={() => setMenueVisible(false)}>
      {resultAPI?.map((place, id) => (

        <Link to={`/${place.id}/${place.slug}`} className="article-card">
          <article key={id}>
            {/* <img src={place.pictures[0].url} alt="avatar" /> */}
            <div className="content">
              <h2 className="placename-card"> {place.name}</h2>
              <h3 className="placecity-card">
                <span className="zipcode">{place.postcode}</span> - {place.city}
              </h3>
              <span> {place.rating}</span>
            </div>
          </article>
        </Link>
      ))}
      {visibleCards < places.length && (
        <button className="load-more-button" onClick={loadMoreCards}>
          Afficher plus
        </button>
      )}
    </div>
  );
};

export default Card;
