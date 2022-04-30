import React, { useState } from 'react';
import SVG from "react-inlinesvg";
import cn from 'classnames';

import { BRAND_LOGOS, LICENCES, TYPES } from './images';

const FilterElement = ({ 
  category,
  filter,
  value,
  onSelect,
  onDiselect,
  filterEnabled
 }) => {

  const [enabled, setEnabled] = useState(false);

  const image = 
    category === "brand" ? 
      <img className='image' src={BRAND_LOGOS[filter]} alt="" /> :
      <SVG className='svg' src={category === "licence" ? LICENCES[filter] : TYPES[filter]} />

  const topContainer = 
    ["brand", "type", "licence"].includes(category) ?
      <>
        {image}
        <p className='filterNameSmall'>{filter}</p>
      </> :
      <p className='filterName'>{filter}</p>

  return (
    <div className={cn('FilterElement', {disabled: filterEnabled && !enabled})}>
      <div className='topContainer' onClick={() => {
        if (enabled) onDiselect();
        else onSelect();
        setEnabled(!enabled)}
      }>
        {topContainer}
      </div>
      <div className='valuationBarContainer'>
        <div className='barProgress' style={{
          width: `${Math.floor(value*100)}%`,
        }} />
      </div>
    </div>
  );
}

export default FilterElement;