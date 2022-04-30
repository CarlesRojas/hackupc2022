import React, { useState } from 'react';

import cn from 'classnames';

const TextFilter = (
  category,
  filter,
  value,
  onSelect,
  onDiselect,
  filterEnabled
) => {
  
  const [enabled, setEnabled] = useState(false);

  return(
    <div className={cn('TextFilter', {disabled: filterEnabled && !enabled})}>
      <div className='imageContainer' onClick={() => {
        if (enabled) onDiselect();
        else onSelect();
        setEnabled(!enabled)}
      }>
        {image}
        <p className='filterName'>{filter}</p>
      </div>
      <div className='valuationBarContainer'>
        <div className='barProgress' style={{
          width: `${Math.floor(value*100)}%`,
        }} />
      </div>
    </div>
  ); 
}

export default TextFilter;