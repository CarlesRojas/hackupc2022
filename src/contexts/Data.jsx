import { createContext, useEffect, useState, useContext, useRef } from "react";

import { API } from "./API";
import { TasteHandler } from "./TasteHandler";

export const Data = createContext();
const DataProvider = (props) => {
    const { getMotosListData, getNextMoto } = useContext(API);
    const { tastesPct } = useContext(TasteHandler);

    const [myList, setMyList] = useState([]);
    const [listData, setListData] = useState([]);

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
        const newMoto = await getNextMoto(tastesPct, myList);
        if (replaceFirst) setFirstMoto(newMoto);
        else setSecondMoto(newMoto);
    };

    const firstPassDone = useRef(false);
    useEffect(() => {
        if (firstPassDone.current) return;
        firstPassDone.current = true;

        const getData = async () => {
            // Load next 2 motos
            const newMotoOne = await getNextMoto(tastesPct, myList);
            const newMotoTwo = await getNextMoto(tastesPct, myList);
            setFirstMoto(newMotoOne);
            setSecondMoto(newMotoTwo);

            // Load saved List
            const mySavedList = JSON.parse(localStorage.getItem("mundimoto_myList")) || [];
            setMyList(mySavedList);

            const mySavedData = await getMotosListData(mySavedList);
            setListData(mySavedData);
        };

        getData();
    }, [getMotosListData, getNextMoto, myList, tastesPct]);

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
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
