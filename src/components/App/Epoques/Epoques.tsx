import React from "react";
import centuries from '../../../data/centuries.json';

const Epoques = () => {
  return (
    <div className="centuries">
<ul>
        {centuries.map((century, key) => (
          <li key={key}>
            {century.century}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Epoques;