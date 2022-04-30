import { createContext, useRef, useState } from "react";

const WORST_TIME = 10000;
const INITIAL_VALUATION = 100000;

export const TasteHandler = createContext();
const TasteHandlerProvider = (props) => {

    const tastesValuation = useRef({
        price: {
            "0-1000": 0,
            "1000-1500": INITIAL_VALUATION,
            "1500-2500": INITIAL_VALUATION,
            "2500-3000": INITIAL_VALUATION,
            "3000-5000": INITIAL_VALUATION,
            "5000-7500": INITIAL_VALUATION,
            "7500-10000": INITIAL_VALUATION,
            "10000-15000": INITIAL_VALUATION,
            "15000-20000": INITIAL_VALUATION,
            "20000-23000": INITIAL_VALUATION
        },
        license: {
            "am": INITIAL_VALUATION,
            "a1/b": INITIAL_VALUATION,
            "a2": INITIAL_VALUATION,
            "a": INITIAL_VALUATION
        },
        cubic_centimerers: {
            "0-50": INITIAL_VALUATION,
            "50-125": INITIAL_VALUATION,
            "125-250": INITIAL_VALUATION,
            "250-500": INITIAL_VALUATION,
            "500-700": INITIAL_VALUATION,
            "1000-1500": INITIAL_VALUATION,
            "1500-2000": INITIAL_VALUATION
        },
        type: {
            "scooter": INITIAL_VALUATION,
            "maxi_scooter": INITIAL_VALUATION,
            "classic": INITIAL_VALUATION,
            "naked": INITIAL_VALUATION,
            "sport": INITIAL_VALUATION,
            "touring": INITIAL_VALUATION,
            "trail": INITIAL_VALUATION,
            "off_road": INITIAL_VALUATION,
            "custom": INITIAL_VALUATION,
            "tree_weels": INITIAL_VALUATION,
        },
        brand: {
            "aprilia": INITIAL_VALUATION,
            "benelli": INITIAL_VALUATION,
            "bmw": INITIAL_VALUATION,
            "brixton": INITIAL_VALUATION,
            "cake motorbikes": INITIAL_VALUATION,
            "cfmoto": INITIAL_VALUATION,
            "daelim": INITIAL_VALUATION,
            "derbi": INITIAL_VALUATION,
            "ducati": INITIAL_VALUATION,
            "fantic": INITIAL_VALUATION,
            "fb mondial": INITIAL_VALUATION,
            "fk motors": INITIAL_VALUATION,
            "fkm": INITIAL_VALUATION,
            "gas gas": INITIAL_VALUATION,
            "gilera": INITIAL_VALUATION,
            "goes": INITIAL_VALUATION,
            "hanway": INITIAL_VALUATION,
            "harley davidson": INITIAL_VALUATION,
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
            "moto guzzi": INITIAL_VALUATION,
            "motor hispania": INITIAL_VALUATION,
            "mv agusta": INITIAL_VALUATION,
            "orcal": INITIAL_VALUATION,
            "peugeot": INITIAL_VALUATION,
            "piaggio": INITIAL_VALUATION,
            "quadro": INITIAL_VALUATION,
            "rieju": INITIAL_VALUATION,
            "royal enfield": INITIAL_VALUATION,
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
            "2020-now": INITIAL_VALUATION
        },
        mileage: {
            "0-10000": INITIAL_VALUATION,
            "10000-20000": INITIAL_VALUATION,
            "20000-30000": INITIAL_VALUATION,
            "30000-40000": INITIAL_VALUATION,
            "40000-50000": INITIAL_VALUATION,
            "50000-60000": INITIAL_VALUATION,
            "60000-70000": INITIAL_VALUATION
        },
        totalViewed: 0
    })

    const [tastesPct, setTastesPct] = useState({
        price: {
            "0-1000": 0.01,
            "1000-1500": 0.1,
            "1500-2500": 0.1,
            "2500-3000": 0.1,
            "3000-5000": 0.1,
            "5000-7500": 0.1,
            "7500-10000": 0.1,
            "10000-15000": 0.1,
            "15000-20000": 0.1,
            "20000-23000": 0.1
        },
        license: {
            "am": 0.25,
            "a1/b": 0.25,
            "a2": 0.25,
            "a": 0.25
        },
        cubic_centimerers: {
            "0-50": 1/7.0,
            "50-125": 1/7.0,
            "125-250": 1/7.0,
            "250-500": 1/7.0,
            "500-700": 1/7.0,
            "1000-1500": 1/7.0,
            "1500-2000": 1/7.0
        },
        type: {
            "scooter": 0.1,
            "maxi_scooter": 0.1,
            "classic": 0.1,
            "naked": 0.1,
            "sport": 0.1,
            "touring": 0.1,
            "trail": 0.1,
            "off_road": 0.1,
            "custom": 0.1,
            "tree_weels": 0.1,
        },
        brand: {
            "aprilia": 1/48.0,
            "benelli": 1/48.0,
            "bmw": 1/48.0,
            "brixton": 1/48.0,
            "cake motorbikes": 1/48.0,
            "cfmoto": 1/48.0,
            "daelim": 1/48.0,
            "derbi": 1/48.0,
            "ducati": 1/48.0,
            "fantic": 1/48.0,
            "fb mondial": 1/48.0,
            "fk motors": 1/48.0,
            "fkm": 1/48.0,
            "gas gas": 1/48.0,
            "gilera": 1/48.0,
            "goes": 1/48.0,
            "hanway": 1/48.0,
            "harley davidson": 1/48.0,
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
            "moto guzzi": 1/48.0,
            "motor hispania": 1/48.0,
            "mv agusta": 1/48.0,
            "orcal": 1/48.0,
            "peugeot": 1/48.0,
            "piaggio": 1/48.0,
            "quadro": 1/48.0,
            "rieju": 1/48.0,
            "royal enfield": 1/48.0,
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
            "1980-1985": 1/9.0,
            "1985-1990": 1/9.0,
            "1990-1995": 1/9.0,
            "1995-2000": 1/9.0,
            "2000-2005": 1/9.0,
            "2005-2010": 1/9.0,
            "2010-2015": 1/9.0,
            "2015-2020": 1/9.0,
            "2020-now": 1/9.0
        },
        mileage: {
            "0-10000": 1/7.0,
            "10000-20000": 1/7.0,
            "20000-30000": 1/7.0,
            "30000-40000": 1/7.0,
            "40000-50000": 1/7.0,
            "50000-60000": 1/7.0,
            "60000-70000": 1/7.0
        }
    })

    const filters = useRef({})

    const newTasteValuation = (
        oldValuation,
        newValuation,
        totalViewed,
    ) => {
        return Math.max(((oldValuation * totalViewed) + newValuation) / (totalViewed + 1), 0);
    }

    const calcNewPcts = () => {
        const newPcts = {};
        const actualValuation = tastesValuation.current
        for (var category in actualValuation) {
            if (category !== "totalViewed") {
                var totalValuation = 0;
                var numberOfZeroPct = 0;
                newPcts[category] = {}
                for (var key in actualValuation[category]) {
                    if (!(filters.current[category] != null && !filters.current[category].includes(key))) {
                        if (actualValuation[category][key] === 0) {
                            numberOfZeroPct += 1;
                        } 
                        else totalValuation += actualValuation[category][key];
                    }
                }
                totalValuation += (totalValuation/100) * numberOfZeroPct;
                for (key in actualValuation[category]) {
                    if (filters.current[category] != null) {
                        if (!filters.current[category].includes(key)) newPcts[category][key] = 0.0;
                        else {
                            if (actualValuation[category][key] === 0) {
                                if (filters.current[category].length == 1) newPcts[category][key] = 1.0;
                                else newPcts[category][key] = 0.0;
                            }
                            else newPcts[category][key] = actualValuation[category][key] / totalValuation;
                        }
                    } else {
                        if (actualValuation[category][key] === 0) newPcts[category][key] = 0.01;
                        else newPcts[category][key] = actualValuation[category][key] / totalValuation;
                    }
                }
            }
        }
        setTastesPct(newPcts);
    }

    const newValuation = (
        price,
        license,
        cubic_centimerers,
        type,
        brand,
        year,
        mileage,
        valuation,
    ) => {
        const auxTastes = {...tastesValuation.current};
        auxTastes["price"][price] = newTasteValuation(auxTastes["price"][price], valuation, auxTastes["totalViewed"]);
        auxTastes["license"][license] = newTasteValuation(auxTastes["license"][license], valuation, auxTastes["totalViewed"]);
        auxTastes["cubic_centimerers"][cubic_centimerers] = newTasteValuation(auxTastes["cubic_centimerers"][cubic_centimerers], valuation, auxTastes["totalViewed"]);
        auxTastes["type"][type] = newTasteValuation(auxTastes["type"][type], valuation, auxTastes["totalViewed"]);
        auxTastes["brand"][brand] = newTasteValuation(auxTastes["brand"][brand], valuation, auxTastes["totalViewed"]);
        auxTastes["year"][year] = newTasteValuation(auxTastes["year"][year], valuation, auxTastes["totalViewed"]);
        auxTastes["mileage"][mileage] = newTasteValuation(auxTastes["mileage"][mileage], valuation, auxTastes["totalViewed"]);
        auxTastes["totalViewed"] += 1;
        tastesValuation.current = auxTastes;
        calcNewPcts();
    }

    const likeBike = (
        price,
        license,
        cubic_centimerers,
        type,
        brand,
        year,
        mileage,
        timeToLike,
    ) => {
        const valuation = WORST_TIME - timeToLike;
        newValuation(price, license, cubic_centimerers, type, brand, year, mileage, timeToLike, valuation);
    }

    const dislikeBike = (
        price,
        license,
        cubic_centimerers,
        type,
        brand,
        year,
        mileage,
        timeToLike,
    ) => {
        const valuation = timeToLike - WORST_TIME;
        newValuation(price, license, cubic_centimerers, type, brand, year, mileage, timeToLike, valuation);
    }

    const addFilter = (category, toFilter) => {
        const actualFilters = {...filters.current};
        if (actualFilters[category] == null) actualFilters[category] = [];
        actualFilters[category].push(toFilter);
        filters.current = actualFilters;
        calcNewPcts();
    }

    const removeFilter = (category, toRemove) => {
        const actualFilters = {...filters.current};
        if (actualFilters[category] == null) return;
        actualFilters[category] = actualFilters[category].filter((filter) => {
            return filter != toRemove;
        });
        if (actualFilters[category].length === 0) delete actualFilters[category];
        filters.current = actualFilters;
        calcNewPcts();
    }

    return (
        <TasteHandler.Provider
            value={{
                tastesPct,
                likeBike,
                dislikeBike,
                addFilter,
                removeFilter
            }}
        >
            {props.children}
        </TasteHandler.Provider>
    );
};

export default TasteHandlerProvider;
