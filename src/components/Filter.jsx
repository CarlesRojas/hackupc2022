import React, { useContext, Fragment, useRef, useEffect, useState } from "react";

import { CATEGORIES_TRANSLATION, TYPES_TRANSLATION, BRANDS_TRANSLATION, LICENCES_TRANSLATION } from "./translates";

import { Data } from "../contexts/Data";
import FilterElement from "./FilterElement";

export default function Filter() {
    const { limits, medians, selectFilter, filtersStatus } = useContext(Data);

    const mediansOrder = ["price", "cc", "km", "year"];
    const medianSign = [" €", " c.c.", " km", ""];

    const filtersOrder = ["type", "licence", "brand"];
    const filtersTranslations = [TYPES_TRANSLATION, LICENCES_TRANSLATION, BRANDS_TRANSLATION];

    const point = useRef();
    const bar = useRef();

    const [boxes, setBoxes] = useState({ bar: { left: 0 }, point: { left: 0 } });

    useEffect(() => {
        setBoxes({ bar: bar.current.getBoundingClientRect(), point: point.current.getBoundingClientRect() });
    }, []);

    return (
        <div className="Filter">
            {mediansOrder.map((category, i) => {
                const pointPos =
                    (medians[category] - limits.current[category].min) /
                    (limits.current[category].max - limits.current[category].min);

                console.log("");
                console.log(boxes.point.left);
                console.log(boxes.bar.left);
                const withPct = 40 / (boxes.bar.right - boxes.bar.left);

                return (
                    <Fragment key={category}>
                        <p className="title">{CATEGORIES_TRANSLATION[category]}</p>
                        <div className="container">
                            <div className="bar" ref={bar}>
                                <div
                                    className="pointContainer"
                                    ref={point}
                                    style={{
                                        left: `${Math.max(withPct, Math.min(pointPos, 1 - withPct)) * 100}%`,
                                    }}
                                >
                                    <p className="pointNum">
                                        {parseInt(medians[category]).toLocaleString("es-ES") + medianSign[i]}
                                    </p>
                                    <div className="point"></div>
                                </div>
                            </div>

                            <div className="minmax">
                                <p className="min">
                                    {parseInt(limits.current[category].min).toLocaleString("es-ES") + medianSign[i]}
                                </p>
                                <p className="max">
                                    {parseInt(limits.current[category].max).toLocaleString("es-ES") + medianSign[i]}
                                </p>
                            </div>
                        </div>
                    </Fragment>
                );
            })}

            {filtersOrder.map((category, i) => {
                return (
                    <Fragment key={category}>
                        <p className="title">{CATEGORIES_TRANSLATION[category]}</p>
                        <div className="grid">
                            {Object.keys(filtersTranslations[i]).map((filter) => (
                                <FilterElement
                                    key={filter}
                                    category={category}
                                    filter={filter}
                                    selectFilter={() => selectFilter(category, filter)}
                                    isActive={filtersStatus[category][filter]}
                                />
                            ))}
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}
