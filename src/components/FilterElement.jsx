import React, { useState } from "react";
import SVG from "react-inlinesvg";
import cn from "classnames";

import { BRAND_LOGOS, LICENCES, TYPES } from "./images";

import { TYPES_TRANSLATION, BRANDS_TRANSLATION, LICENCES_TRANSLATION } from "./translates";

const FilterElement = ({ category, filter, value, onSelect, onDiselect, filterEnabled }) => {
    const [enabled, setEnabled] = useState(false);

    const image =
        category === "brand" ? (
            <img className="image" src={BRAND_LOGOS[filter]} alt="" />
        ) : (
            <SVG className="svg" src={category === "licence" ? LICENCES[filter] : TYPES[filter]} />
        );

    const topContainer = ["brand", "type", "licence"].includes(category) ? (
        <>
            {image}
            <p className="filterNameSmall">
                {category === "type"
                    ? TYPES_TRANSLATION[filter]
                    : category === "licence"
                    ? LICENCES_TRANSLATION[filter]
                    : category === "brand"
                    ? BRANDS_TRANSLATION[filter]
                    : filter}
            </p>
        </>
    ) : (
        <p className="filterName">
            {category === "price"
                ? filter
                      .split("-")
                      .map((elem) => `${parseInt(elem).toLocaleString("es-ES")}€`)
                      .join(" - ")
                : category === "cc"
                ? filter.split("-").join(" - ") + " c.c."
                : category === "year"
                ? filter.split("-").join(" - ")
                : category === "km"
                ? filter
                      .split("-")
                      .map((elem) => `${parseInt(elem).toLocaleString("es-ES")}`)
                      .join(" - ") + " km"
                : filter}
        </p>
    );

    return (
        <div className={cn("FilterElement", { disabled: filterEnabled && !enabled })}>
            <div
                className="topContainer"
                onClick={() => {
                    if (enabled) onDiselect();
                    else onSelect();
                    setEnabled(!enabled);
                }}
            >
                {topContainer}
            </div>
            <div className="valuationBarContainer">
                <div
                    className="barProgress"
                    style={{
                        width: `${Math.floor(value * 100)}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default FilterElement;
