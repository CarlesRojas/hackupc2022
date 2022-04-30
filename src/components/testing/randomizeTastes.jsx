import React, { useContext, useState } from 'react';
import {TasteHandler} from '../../contexts/TasteHandler'


const Filter = ({
  addFilter, 
  removeFilter,
  category, 
  filter,
  tastesPct
}) => {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <p key={filter} className='data' onClick={() => {
      if (!enabled) addFilter(category, filter);
      else removeFilter(category, filter);
      setEnabled(!enabled);
    }}>{filter}: {tastesPct[category][filter]}</p>
  )
}

const RandomizeTastes = () => {
  const {
    tastesPct,
    likeBike,
    dislikeBike,
    addFilter,
    removeFilter
  } = useContext(TasteHandler);

  console.log(tastesPct)

  const printTastes = (
      <div className='scrollableList'>
        {
          Object.keys(tastesPct).map((category) => {
            var pct = 0;
            return (
              <div key={category}>
                <h1 className='header'>{category}</h1>
                {Object.keys(tastesPct[category]).map((filter) => {
                  pct += tastesPct[category][filter]
                  return (
                    <Filter 
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      category={category}
                      filter={filter}
                      tastesPct={tastesPct}
                    />
                  )
                })}
                <p>total percentage: {pct}</p>
              </div>
            )
          })
        }
      </div>
    );

  const getRandom = (dict) => {
    console.log(dict)
    const array = Object.keys(dict)
    return array[Math.floor(Math.random()*array.length)]
  }

  const onClick = () => {
    const rand = (Math.random() - 0.5) * 20000;
    const price = getRandom(tastesPct["price"]);
    const license = getRandom(tastesPct["license"]);
    const cubic_centimerers = getRandom(tastesPct["cubic_centimerers"]);
    const type = getRandom(tastesPct["type"]);
    const brand = getRandom(tastesPct["brand"]);
    const year = getRandom(tastesPct["year"]);
    const mileage = getRandom(tastesPct["mileage"]);
    if (rand > 0) likeBike(price, license, cubic_centimerers, type, brand, year, mileage, rand);
    else dislikeBike(price, license, cubic_centimerers, type, brand, year, mileage, -rand);
  }

  return (
    <div className='RandomizeTest'>
      {printTastes}
      <button className='randomizeButton' onClick={() => {onClick()}}>randomize</button>
    </div>
  )
}

export default RandomizeTastes;