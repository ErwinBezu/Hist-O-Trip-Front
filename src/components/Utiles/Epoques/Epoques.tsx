import React, { useContext } from 'react';
import centuries from '../../../data/centuries.json';
import { CenturiesList } from '../../contexts';

const Epoques = () => {
  const centuriesList = useContext(CenturiesList);
  console.log(centuriesList);
  return (
    <div className="centuries">
      <ul>
        {centuriesList.map((century, key) => (
          <li key={key}>
            <label>
              <input type="checkbox" />
              {century.century}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Epoques;
