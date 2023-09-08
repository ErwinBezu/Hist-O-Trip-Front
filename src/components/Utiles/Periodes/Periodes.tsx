import React, { useContext, useState } from 'react';
import { CenturiesList, SelectedCenturies } from '../../contexts';
import './Periodes.scss';
import { MdArrowDropDown } from 'react-icons/md';

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
    if (selectedCenturies.includes(centuryId)) {
      setSelectedCenturies(selectedCenturies.filter((id) => id !== centuryId));
    } else {
      setSelectedCenturies([...selectedCenturies, centuryId]);
    }
  };
  console.log(selectedCenturies);

  return (
    <div className="periodes">
      {Object.keys(centuriesByPeriod).map((period, key) => (
        <div key={key}>
          <h2 onClick={() => handlePeriodClick(period)}>
            {period}{' '}
            <MdArrowDropDown
              className={`periode-icon ${
                selectedPeriod === period ? 'rotate-icon' : ''
              }`}
            />
          </h2>
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
