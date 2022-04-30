import React, { useContext, Fragment } from "react";
import cn from "classnames";

import { CATEGORIES_TRANSLATION } from "./translates";

import { TasteHandler } from "../contexts/TasteHandler";
import FilterElement from "./FilterElement";

export default function Filter() {
    const { tastesPct, addFilter, removeFilter, filtersEnabled, filters } = useContext(TasteHandler);

    return (
        <div className="Filter">
            {Object.keys(CATEGORIES_TRANSLATION).map((category) => (
                <Fragment key={category}>
                    <p className="title">{CATEGORIES_TRANSLATION[category]}</p>
                    <div className={cn("grid", { small: ["brand", "type", "licence"].includes(category) })}>
                        {Object.keys(tastesPct[category]).map((filter) => (
                            <FilterElement
                                key={filter}
                                category={category}
                                filter={filter}
                                value={tastesPct[category][filter]}
                                onSelect={() => {
                                    addFilter(category, filter);
                                }}
                                onDiselect={() => {
                                    removeFilter(category, filter);
                                }}
                                filterEnabled={filtersEnabled.current.includes(category)}
                                filters={filters}
                            />
                        ))}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}
