import React, { useContext, useState } from 'react';

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
  const [selectedCentury, setSelectedCentury] = useState([]);

  const handleCenturySelect = (century) => {
    setSelectedCentury(century);
  }
  console.log(selectedCentury);

  return (
    <div className="periodes">
      <ul>
        {filteredPeriods.map((century) => (
          <li key={century.id} onClick={() => handleCenturySelect(century)}>
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
