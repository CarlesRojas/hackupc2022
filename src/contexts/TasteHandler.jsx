import { createContext, useRef, useState, useEffect } from "react";

const WORST_TIME = 10000;
const INITIAL_VALUATION = 100000;

export const TasteHandler = createContext();
const TasteHandlerProvider = (props) => {
    const tastesValuation = useRef(localStorage.getItem("mundimoto_tastesValuation") || {
        price: {
            "0-1000": INITIAL_VALUATION,
            "1000-1500": INITIAL_VALUATION,
            "1500-2500": INITIAL_VALUATION,
            "2500-3000": INITIAL_VALUATION,
            "3000-5000": INITIAL_VALUATION,
            "5000-7500": INITIAL_VALUATION,
            "7500-10000": INITIAL_VALUATION,
            "10000-15000": INITIAL_VALUATION,
            "15000-20000": INITIAL_VALUATION,
            "20000-23000": INITIAL_VALUATION,
        },
        licence: {
            "am": INITIAL_VALUATION,
            "a1b": INITIAL_VALUATION,
            "a2": INITIAL_VALUATION,
            "a": INITIAL_VALUATION
        },
        cc: {
            "0-50": INITIAL_VALUATION,
            "50-125": INITIAL_VALUATION,
            "125-250": INITIAL_VALUATION,
            "250-500": INITIAL_VALUATION,
            "500-700": INITIAL_VALUATION,
            "1000-1500": INITIAL_VALUATION,
            "1500-2000": INITIAL_VALUATION,
        },
        type: {
            "scooter": INITIAL_VALUATION,
            "maxiScooter": INITIAL_VALUATION,
            "classic": INITIAL_VALUATION,
            "naked": INITIAL_VALUATION,
            "sport": INITIAL_VALUATION,
            "touring": INITIAL_VALUATION,
            "trail": INITIAL_VALUATION,
            "offRoad": INITIAL_VALUATION,
            "custom": INITIAL_VALUATION,
            "tresRuedas": INITIAL_VALUATION,
        },
        brand: {
            "aprilia": INITIAL_VALUATION,
            "benelli": INITIAL_VALUATION,
            "bmw": INITIAL_VALUATION,
            "brixton": INITIAL_VALUATION,
            "cake": INITIAL_VALUATION,
            "cfmoto": INITIAL_VALUATION,
            "daelim": INITIAL_VALUATION,
            "derbi": INITIAL_VALUATION,
            "ducati": INITIAL_VALUATION,
            "fantic": INITIAL_VALUATION,
            "fbMondial": INITIAL_VALUATION,
            "fkMotors": INITIAL_VALUATION,
            "fkm": INITIAL_VALUATION,
            "gasGas": INITIAL_VALUATION,
            "gilera": INITIAL_VALUATION,
            "goes": INITIAL_VALUATION,
            "hanway": INITIAL_VALUATION,
            "harleyDavidson": INITIAL_VALUATION,
            "honda": INITIAL_VALUATION,
            "husaberg": INITIAL_VALUATION,
            "husqvarna": INITIAL_VALUATION,
            "indian": INITIAL_VALUATION,
            "kawasaki": INITIAL_VALUATION,
            "keeway": INITIAL_VALUATION,
            "ktm": INITIAL_VALUATION,
            "kymco": INITIAL_VALUATION,
            "lml": INITIAL_VALUATION,
            "macbor": INITIAL_VALUATION,
            "mash": INITIAL_VALUATION,
            "mitt": INITIAL_VALUATION,
            "motoGuzzi": INITIAL_VALUATION,
            "motorHispania": INITIAL_VALUATION,
            "mvAgusta": INITIAL_VALUATION,
            "orcal": INITIAL_VALUATION,
            "peugeot": INITIAL_VALUATION,
            "piaggio": INITIAL_VALUATION,
            "quadro": INITIAL_VALUATION,
            "rieju": INITIAL_VALUATION,
            "royalEnfield": INITIAL_VALUATION,
            "suzuki": INITIAL_VALUATION,
            "swm": INITIAL_VALUATION,
            "sym": INITIAL_VALUATION,
            "triumph": INITIAL_VALUATION,
            "um": INITIAL_VALUATION,
            "vespa": INITIAL_VALUATION,
            "voge": INITIAL_VALUATION,
            "yamaha": INITIAL_VALUATION,
            "zontes": INITIAL_VALUATION
        },
        year: {
            "1980-1985": INITIAL_VALUATION,
            "1985-1990": INITIAL_VALUATION,
            "1990-1995": INITIAL_VALUATION,
            "1995-2000": INITIAL_VALUATION,
            "2000-2005": INITIAL_VALUATION,
            "2005-2010": INITIAL_VALUATION,
            "2010-2015": INITIAL_VALUATION,
            "2015-2020": INITIAL_VALUATION,
            "2020-2022": INITIAL_VALUATION,
        },
        km: {
            "0-10000": INITIAL_VALUATION,
            "10000-20000": INITIAL_VALUATION,
            "20000-30000": INITIAL_VALUATION,
            "30000-40000": INITIAL_VALUATION,
            "40000-50000": INITIAL_VALUATION,
            "50000-60000": INITIAL_VALUATION,
            "60000-70000": INITIAL_VALUATION,
        }
    });

    const [tastesPct, setTastesPct] = useState({
        price: {
            "0-1000": 0.1,
            "1000-1500": 0.1,
            "1500-2500": 0.1,
            "2500-3000": 0.1,
            "3000-5000": 0.1,
            "5000-7500": 0.1,
            "7500-10000": 0.1,
            "10000-15000": 0.1,
            "15000-20000": 0.1,
            "20000-23000": 0.1,
        },
        licence: {
            "am": 0.25,
            "a1b": 0.25,
            "a2": 0.25,
            "a": 0.25
        },
        cc: {
            "0-50": 1 / 7.0,
            "50-125": 1 / 7.0,
            "125-250": 1 / 7.0,
            "250-500": 1 / 7.0,
            "500-700": 1 / 7.0,
            "1000-1500": 1 / 7.0,
            "1500-2000": 1 / 7.0,
        },
        type: {
            "scooter": 0.1,
            "maxiScooter": 0.1,
            "classic": 0.1,
            "naked": 0.1,
            "sport": 0.1,
            "touring": 0.1,
            "trail": 0.1,
            "offRoad": 0.1,
            "custom": 0.1,
            "tresRuedas": 0.1,
        },
        brand: {
            "aprilia": 1/48.0,
            "benelli": 1/48.0,
            "bmw": 1/48.0,
            "brixton": 1/48.0,
            "cake": 1/48.0,
            "cfmoto": 1/48.0,
            "daelim": 1/48.0,
            "derbi": 1/48.0,
            "ducati": 1/48.0,
            "fantic": 1/48.0,
            "fbMondial": 1/48.0,
            "fkMotors": 1/48.0,
            "fkm": 1/48.0,
            "gasGas": 1/48.0,
            "gilera": 1/48.0,
            "goes": 1/48.0,
            "hanway": 1/48.0,
            "harleyDavidson": 1/48.0,
            "honda": 1/48.0,
            "husaberg": 1/48.0,
            "husqvarna": 1/48.0,
            "indian": 1/48.0,
            "kawasaki": 1/48.0,
            "keeway": 1/48.0,
            "ktm": 1/48.0,
            "kymco": 1/48.0,
            "lml": 1/48.0,
            "macbor": 1/48.0,
            "mash": 1/48.0,
            "mitt": 1/48.0,
            "motoGuzzi": 1/48.0,
            "motorHispania": 1/48.0,
            "mvAgusta": 1/48.0,
            "orcal": 1/48.0,
            "peugeot": 1/48.0,
            "piaggio": 1/48.0,
            "quadro": 1/48.0,
            "rieju": 1/48.0,
            "royalEnfield": 1/48.0,
            "suzuki": 1/48.0,
            "swm": 1/48.0,
            "sym": 1/48.0,
            "triumph": 1/48.0,
            "um": 1/48.0,
            "vespa": 1/48.0,
            "voge": 1/48.0,
            "yamaha": 1/48.0,
            "zontes": 1/48.0
        },
        year: {
            "1980-1985": 1 / 9.0,
            "1985-1990": 1 / 9.0,
            "1990-1995": 1 / 9.0,
            "1995-2000": 1 / 9.0,
            "2000-2005": 1 / 9.0,
            "2005-2010": 1 / 9.0,
            "2010-2015": 1 / 9.0,
            "2015-2020": 1 / 9.0,
            "2020-2022": 1 / 9.0,
        },
        km: {
            "0-10000": 1 / 7.0,
            "10000-20000": 1 / 7.0,
            "20000-30000": 1 / 7.0,
            "30000-40000": 1 / 7.0,
            "40000-50000": 1 / 7.0,
            "50000-60000": 1 / 7.0,
            "60000-70000": 1 / 7.0,
        },
    });

    useEffect(() => {
        localStorage.setItem("mundimoto_tastesValuation", tastesValuation.current)
    }, [tastesPct])

    const filters = useRef({});
    const filtersEnabled = useRef([]);

    const calcNewPcts = () => {
        const newPcts = {};
        const actualValuation = tastesValuation.current;
        for (var category in actualValuation) {
            var totalValuation = 0;
            var numberOfZeroPct = 0;
            newPcts[category] = {};
            for (var key in actualValuation[category]) {
                if (!(filters.current[category] != null && !filters.current[category].includes(key))) {
                    if (actualValuation[category][key] === 0) {
                        numberOfZeroPct += 1;
                    } else totalValuation += actualValuation[category][key];
                }
            }
            totalValuation += (totalValuation / 100) * numberOfZeroPct;
            for (key in actualValuation[category]) {
                if (filters.current[category] != null) {
                    if (!filters.current[category].includes(key)) newPcts[category][key] = 0.0;
                    else {
                        if (actualValuation[category][key] === 0) {
                            if (filters.current[category].length === 1) newPcts[category][key] = 1.0;
                            else newPcts[category][key] = 0.0;
                        } else newPcts[category][key] = actualValuation[category][key] / totalValuation;
                    }
                } else {
                    if (actualValuation[category][key] === 0) newPcts[category][key] = 0.01;
                    else newPcts[category][key] = actualValuation[category][key] / totalValuation;
                }
            }
        }
        setTastesPct(newPcts);
    };

    const newValuation = (price, licence, cc, type, brand, year, km, valuation) => {
        console.log(`licence ${licence}`)
        const auxTastes = { ...tastesValuation.current };
        auxTastes["price"][price] += valuation;
        auxTastes["licence"][licence] += valuation;
        auxTastes["cc"][cc] += valuation;
        auxTastes["type"][type] += valuation;
        auxTastes["brand"][brand] += valuation;
        auxTastes["year"][year] += valuation;
        auxTastes["km"][km] += valuation;
        tastesValuation.current = auxTastes;
        calcNewPcts();
    };

    const findInterval = (value, dict) => {
        const keys = Object.keys(dict);
        if (value === parseInt(keys[0].split("-"))) return keys[0]
        for (var key in dict) {
            const interval = key.split("-");
            if (parseInt(interval[0]) < value && value <= parseInt(interval[1])) return key;
        }
        return "err";
    };

    const likeBike = (price, licence, cc, type, brand, year, km, timeToLike) => {
        const priceInterval = findInterval(price, tastesPct["price"]);
        const ccInterval = findInterval(cc, tastesPct["cc"]);
        const yearInterval = findInterval(year, tastesPct["year"]);
        const kmInterval = findInterval(km, tastesPct["km"]);
        const valuation = WORST_TIME - timeToLike;
        newValuation(priceInterval, licence, ccInterval, type, brand, yearInterval, kmInterval, timeToLike, valuation);
    };

    const dislikeBike = (price, licence, cc, type, brand, year, km, timeToLike) => {
        const valuation = timeToLike - WORST_TIME;
        const priceInterval = findInterval(price, tastesPct["price"]);
        const ccInterval = findInterval(cc, tastesPct["cc"]);
        const yearInterval = findInterval(year, tastesPct["year"]);
        const kmInterval = findInterval(km, tastesPct["km"]);
        newValuation(priceInterval, licence, ccInterval, type, brand, yearInterval, kmInterval, timeToLike, valuation);
    };

    const addFilter = (category, toFilter) => {
        const actualFilters = { ...filters.current };
        if (actualFilters[category] == null) {
            actualFilters[category] = [];
            filtersEnabled.current.push(category);
        }
        actualFilters[category].push(toFilter);
        filters.current = actualFilters;
        calcNewPcts();
    };

    const removeFilter = (category, toRemove) => {
        const actualFilters = { ...filters.current };
        if (actualFilters[category] == null) return;
        actualFilters[category] = actualFilters[category].filter((filter) => {
            return filter !== toRemove;
        });
        if (actualFilters[category].length === 0) {
            delete actualFilters[category];
            filtersEnabled.current = filtersEnabled.current.filter((element) => {
                return element !== category;
            })
        }
        filters.current = actualFilters;
        calcNewPcts();
    };

    return (
        <TasteHandler.Provider
            value={{
                tastesPct,
                filtersEnabled,
                likeBike,
                dislikeBike,
                addFilter,
                removeFilter,
            }}
        >
            {props.children}
        </TasteHandler.Provider>
    );
};

export default TasteHandlerProvider;
