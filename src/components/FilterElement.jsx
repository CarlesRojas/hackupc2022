import React from "react";
import SVG from "react-inlinesvg";
import cn from "classnames";

import { BRAND_LOGOS, LICENCES, TYPES } from "./images";

import { TYPES_TRANSLATION, BRANDS_TRANSLATION, LICENCES_TRANSLATION } from "./translates";

const FilterElement = ({ category, filter, selectFilter, isActive }) => {
    const image =
        category === "brand" ? (
            <img className="image" src={BRAND_LOGOS[filter]} alt="" />
        ) : (
            <SVG
                className={cn("svg", {
                    brand: category === "brand",
                    licence: category === "licence",
                    type: category === "type",
                })}
                src={category === "licence" ? LICENCES[filter] : TYPES[filter]}
            />
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
        <div className={cn("FilterElement", { disabled: !isActive })}>
            <div className="topContainer" onClick={selectFilter}>
                {topContainer}
            </div>
        </div>
    );
};

export default FilterElement;
