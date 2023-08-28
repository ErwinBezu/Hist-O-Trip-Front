import React from 'react';

import { LuCastle } from 'react-icons/lu';
import { MdOutlineMuseum, MdMuseum } from 'react-icons/md';
import { PiChurchThin } from 'react-icons/pi';
import {
  GiChurch,
  GiVillage,
  GiMartyrMemorial,
  GiMilitaryFort,
  GiHillFort,
  GiMonaLisa,
  GiCastleRuins,
  GiAnvilImpact,
  GiBunker,
  GiGuards,
} from 'react-icons/gi';
import { FaFortAwesome, FaMonument } from 'react-icons/fa';
import { LiaCrossSolid } from 'react-icons/lia';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return (
    <div>
      {name === 'LuCastle' && <LuCastle />}
      {name === 'MdOutlineMuseum' && <MdOutlineMuseum />}
      {name === 'PiChurchThin' && <PiChurchThin />}
      {name === 'GiChurch' && <GiChurch />}
      {name === 'GiVillage' && <GiVillage />}
      {name === 'GiMartyrMemorial' && <GiMartyrMemorial />}
      {name === 'GiMilitaryFort' && <GiMilitaryFort />}
      {name === 'FaFortAwesome' && <FaFortAwesome />}
      {name === 'GiHillFort' && <GiHillFort />}
      {name === 'LiaCrossSolid' && <LiaCrossSolid />}
      {name === 'MdMuseum' && <MdMuseum />}
      {name === 'FaMonument' && <FaMonument />}
      {name === 'GiGuards' && <GiGuards />}
      {name === 'GiBunker' && <GiBunker />}
      {name === 'GiAnvilImpact' && <GiAnvilImpact />}
      {name === 'GiCastleRuins' && <GiCastleRuins />}
      {name === 'GiMonaLisa' && <GiMonaLisa />}
    </div>
  );
};

export default Icon;
