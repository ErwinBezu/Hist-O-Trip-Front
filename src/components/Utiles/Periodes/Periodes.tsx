import React, { useContext } from 'react';

import { CenturiesList } from '../../contexts';

const Periodes = () => {
  const centuriesList = useContext(CenturiesList);
  const uniquePeriod = new Set();
  const filteredPeriods = centuriesList.filter((century) => {
    if (!uniquePeriod.has(century.period)) {
      uniquePeriod.add(century.period);
      return true;
    }
    return false;
  });

  return (
    <div className="periodes">
      <ul>
        {filteredPeriods.map((century, key) => (
          <li key={key}>
            <label>
              <input type="checkbox" />
              {century.period}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Periodes;
