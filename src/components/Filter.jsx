import React, { useContext, Fragment } from "react";
import RandomizeTastes from './testing/randomizeTastes';

import { TasteHandler } from '../contexts/TasteHandler';
import FilterElement from "./FilterElement";


export default function Filter() {

    const categories = [
        "type",
        "licence",
        "price",
        "cc",
        "year",
        "km",
        "brand",
    ];
    
    const { 
        tastesPct,
        addFilter,
        removeFilter,
        filtersEnabled,
    } = useContext(TasteHandler);

    return <div className="Filter">
        {categories.map((category) => 
                (<Fragment key={category}>
                    <p className='title'>{category}</p>
                    <div className='grid'>
                    {Object.keys(tastesPct[category]).map((filter) => 
                        <FilterElement 
                            key={filter} 
                            category={category} 
                            filter={filter} 
                            value={tastesPct[category][filter]} 
                            onSelect={() => {addFilter(category, filter)}} 
                            onDiselect={() => {removeFilter(category, filter)}}
                            filterEnabled={filtersEnabled.current.includes(category)}
                        />
                    )}
                    </div>
                </Fragment>
        )
        )}
    </div>;
}
