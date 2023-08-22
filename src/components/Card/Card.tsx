import './Card.scss';
import places from '../../data/places.json';

const Card = () => {
  return (
    <div className="cards-container">
      {places.map((place) => (
        <article key={place.id}>
          <img src={place.pictures[0].url} alt="avatar" />
          <div className="content">
            <h2> {place.name}</h2>
            <h3>
              {place.postcode} - {place.city}
            </h3>
            <span> {place.rating}</span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Card;
