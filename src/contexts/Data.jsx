import { createContext, useEffect, useState, useContext, useRef } from "react";
import { API } from "./API";

export const Data = createContext();
const DataProvider = (props) => {
    const { getMotosListData, getNextMoto, getLimits } = useContext(API);

    const [myList, setMyList] = useState([]);
    const [listData, setListData] = useState([]);

    const viewedMotos = useRef([]);

    const totalValuated = useRef(JSON.parse(localStorage.getItem("mundimoto_totalValuated")) || 0);
    const limits = useRef({
        year: { min: -1, max: -1, avg: -1 },
        cc: { min: -1, max: -1, avg: -1 },
        km: { min: -1, max: -1, avg: -1 },
        price: { min: -1, max: -1, avg: -1 },
    });
    const [medians, setMedians] = useState(JSON.parse(localStorage.getItem("mundimoto_medians")) || null);

    const [filtersStatus, setFiltersStatus] = useState({
        type: {
            classic: true,
            custom: true,
            maxiScooter: true,
            naked: true,
            offRoad: true,
            scooter: true,
            sport: true,
            touring: true,
            trail: true,
            tresRuedas: true,
        },
        licence: { a: true, a1b: true, a2: true, am: true },
        brand: {
            aprilia: true,
            benelli: true,
            bmw: true,
            brixton: true,
            cake: true,
            cfmoto: true,
            daelim: true,
            derbi: true,
            ducati: true,
            fantic: true,
            fbMondial: true,
            fkMotors: true,
            fkm: true,
            gasGas: true,
            gilera: true,
            goes: true,
            hanway: true,
            harleyDavidson: true,
            honda: true,
            husaberg: true,
            husqvarna: true,
            indian: true,
            kawasaki: true,
            keeway: true,
            ktm: true,
            kymco: true,
            lml: true,
            macbor: true,
            mash: true,
            mitt: true,
            motoGuzzi: true,
            motorHispania: true,
            mvAgusta: true,
            orcal: true,
            peugeot: true,
            piaggio: true,
            quadro: true,
            rieju: true,
            royalEnfield: true,
            suzuki: true,
            swm: true,
            sym: true,
            triumph: true,
            um: true,
            vespa: true,
            voge: true,
            yamaha: true,
            zontes: true,
        },
    });

    const areAllTrueInCategory = (filtersStatusCopy, category) => {
        for (var value of Object.values(filtersStatusCopy[category])) {
            if (!value) return false;
        }

        return true;
    };

    const areAllFalseInCategory = (filtersStatusCopy, category) => {
        for (var value of Object.values(filtersStatusCopy[category])) {
            if (value) return false;
        }

        return true;
    };

    const selectFilter = (category, filter) => {
        let filtersStatusCopy = JSON.parse(JSON.stringify(filtersStatus));

        if (filtersStatusCopy[category][filter]) {
            if (areAllTrueInCategory(filtersStatusCopy, category)) {
                for (let key of Object.keys(filtersStatusCopy[category])) {
                    filtersStatusCopy[category][key] = key === filter;
                }
            } else {
                filtersStatusCopy[category][filter] = false;

                if (areAllFalseInCategory(filtersStatusCopy, category)) {
                    for (let key of Object.keys(filtersStatusCopy[category])) {
                        filtersStatusCopy[category][key] = true;
                    }
                }
            }
        } else {
            filtersStatusCopy[category][filter] = true;
        }

        setFiltersStatus(filtersStatusCopy);
    };

    const addToMyList = (id, data) => {
        localStorage.setItem("mundimoto_myList", JSON.stringify([...myList, id]));

        setMyList([...myList, id]);
        setListData([...listData, { ...data }]);
    };

    const removeIdFromList = (id) => {
        const index = myList.findIndex((element) => element === id);

        const newMyList = [...myList];
        newMyList.splice(index, 1);
        localStorage.setItem("mundimoto_myList", JSON.stringify([...newMyList]));
        setMyList(newMyList);

        const newListData = [...listData];
        newListData.splice(index, 1);
        setListData(newListData);
    };

    const [firstMoto, setFirstMoto] = useState(null);
    const [secondMoto, setSecondMoto] = useState(null);

    const loadNextMoto = async (replaceFirst) => {
        const newMoto = await getNextMoto(medians, myList, filtersStatus, totalValuated.current, viewedMotos.current);
        viewedMotos.current.push(newMoto.id)
        if (replaceFirst) setFirstMoto(newMoto);
        else setSecondMoto(newMoto);

        totalValuated.current++;
        localStorage.setItem("mundimoto_totalValuated", JSON.stringify(totalValuated.current));
    };

    const firstPassDone = useRef(false);
    useEffect(() => {
        if (firstPassDone.current) return;
        firstPassDone.current = true;

        const getData = async () => {
            // Load limits and medians
            limits.current = await getLimits();

            let newMedians = null;
            if (!medians) {
                newMedians = {
                    year: limits.current.year.avg,
                    cc: limits.current.cc.avg,
                    km: limits.current.km.avg,
                    price: limits.current.price.avg,
                };

                setMedians(newMedians);
            } else newMedians = { ...medians };

            // Load next 2 motos
            const newMotoOne = await getNextMoto(newMedians, myList, filtersStatus, totalValuated.current, viewedMotos.current);
            viewedMotos.current.push(newMotoOne.id)
            const newMotoTwo = await getNextMoto(newMedians, myList, filtersStatus, totalValuated.current, viewedMotos.current);
            viewedMotos.current.push(newMotoTwo.id)
            setFirstMoto(newMotoOne);
            setSecondMoto(newMotoTwo);

            // Load saved List
            const mySavedList = JSON.parse(localStorage.getItem("mundimoto_myList")) || [];
            setMyList(mySavedList);

            const mySavedData = await getMotosListData(mySavedList);
            setListData(mySavedData);
        };

        getData();
    }, [getMotosListData, getNextMoto, myList, getLimits, medians, filtersStatus]);

    const likeMoto = (data) => {
        const newMedians = {};
        Object.keys(medians).forEach((median) => {
            const likedValue = data[median];
            newMedians[median] = medians[median] + (likedValue - medians[median]) / 5;
        });
        setMedians(newMedians);
    };

    const passMoto = (data, decisionTime) => {
        const newMedians = {};
        Object.keys(medians).forEach((median) => {
            const likedValue = data[median];
            newMedians[median] = medians[median] + (likedValue - medians[median]) / (decisionTime < 2 ? 2 : 5);
        });
        setMedians(newMedians);
    };

    return (
        <Data.Provider
            value={{
                myList,
                setMyList,
                addToMyList,
                listData,
                setListData,
                removeIdFromList,
                firstMoto,
                setFirstMoto,
                secondMoto,
                setSecondMoto,
                loadNextMoto,
                likeMoto,
                passMoto,
                limits,
                medians,
                selectFilter,
                filtersStatus,
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
