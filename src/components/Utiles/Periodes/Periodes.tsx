import React from "react";
import centuries from '../../../data/centuries.json';

const Periodes = () => {
  const uniquePeriod = new Set();
  const filteredPeriods = centuries.filter((century) => {
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
            <label><input type="checkbox" />{century.period}</label>
            
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Periodes;