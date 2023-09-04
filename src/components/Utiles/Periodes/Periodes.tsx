import React, { useContext, useState } from 'react';
import { CenturiesList, SelectedCenturies } from '../../contexts';

type Centuries = {
  id: number;
  period: string;
  century: string;
};

const Periodes = () => {
  const centuriesList = useContext(CenturiesList);

  const centuriesByPeriod: { [key: string]: Centuries[] } = {};

  centuriesList.forEach((century) => {
    const { period } = century;
    if (!centuriesByPeriod[period]) {
      centuriesByPeriod[period] = [];
    }
    centuriesByPeriod[period].push(century);
  });

  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const handlePeriodClick = (period: string) => {
    setSelectedPeriod(selectedPeriod === period ? null : period);
  };
  const { selectedCenturies, setSelectedCenturies } =
    useContext(SelectedCenturies);

  const handleCenturiesSelect = (centuryId: number) => {
    setSelectedCenturies((prevSelectedCenturies: number[]) => {
      if (prevSelectedCenturies.includes(centuryId)) {
        return prevSelectedCenturies.filter((id) => id !== centuryId);
      } else {
        return [...prevSelectedCenturies, centuryId];
      }
    });
  };

  return (
    <div className="periodes">
      {Object.keys(centuriesByPeriod).map((period, key) => (
        <div key={key}>
          <h2 onClick={() => handlePeriodClick(period)}>{period}</h2>
          {selectedPeriod === period && (
            <ul>
              {centuriesByPeriod[period].map((century) => (
                <li key={century.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCenturies.includes(century.id)}
                      onChange={() => handleCenturiesSelect(century.id)}
                    />
                    {century.century}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default Periodes;
