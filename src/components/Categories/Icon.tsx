import React from 'react';

import { LuCastle } from 'react-icons/lu';
import { MdOutlineMuseum } from 'react-icons/md';
import { PiChurchThin } from 'react-icons/pi';
import {
  GiChurch,
  GiVillage,
  GiMartyrMemorial,
  GiMilitaryFort,
} from 'react-icons/gi';

const Icon = ({ name }) => {
  return (
    <div>
      {name === 'LuCastle' && <LuCastle />}
      {name === 'MdOutlineMuseum' && <MdOutlineMuseum />}
      {name === 'PiChurchThin' && <PiChurchThin />}
      {name === 'GiChurch' && <GiChurch />}
      {name === 'GiVillage' && <GiVillage />}
      {name === 'GiMartyrMemorial' && <GiMartyrMemorial />}
      {name === 'GiMilitaryFort' && <GiMilitaryFort />}
    </div>
  );
};

export default Icon;
