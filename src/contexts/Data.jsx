import { createContext, useEffect, useState, useContext } from "react";

import { API } from "./API";

export const Data = createContext();
const DataProvider = (props) => {
    const { getMotosListData } = useContext(API);

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

    const [firstMoto, setFirstMoto] = useState({
        id: "0001",
        name: "Yamaha RTX Turbo Pro",
        old_price: 10000,
        price: 7500,
        licence: "a",
        cc: 5000,
        type: "scooter",
        brand: "yamaha",
        year: 2021,
        km: 16000,
        image: "https://cdn.wallapop.com/images/10420/bq/00/__/c10420p708798496/i2540823870.jpg?pictureSize=W640",
        url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/yamaha/mt-01-promo-1nbD8Jpw62QTzAbPFLHe",
    });

    const [secondMoto, setSecondMoto] = useState({
        id: "0002",
        name: "Honda RTX Turbo Pro",
        old_price: 10000,
        price: 7500,
        licence: "a",
        cc: 5000,
        type: "tresRuedas",
        brand: "honda",
        year: 2021,
        km: 16000,
        image: "https://cdn.wallapop.com/images/10420/bq/00/__/c10420p708798496/i2540823870.jpg?pictureSize=W640",
        url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/yamaha/mt-01-promo-1nbD8Jpw62QTzAbPFLHe",
    });

    const loadNextMoto = (replaceFirst) => {
        console.log(replaceFirst);
        // TODO FETCH THE TWO MOTOS and save with setFirstMoto or setSecondMoto deciding with replaceFirst var
    };

    useEffect(() => {
        const getData = async () => {
            // Load next 2 motos
            // TODO FETCH THE TWO MOTOS and save with setFirstMoto and setSecondMoto

            // Load saved List
            // const mySavedList = ["0000000074", "0000000075", "0000000076"];
            const mySavedList = JSON.parse(localStorage.getItem("mundimoto_myList")) || [];
            setMyList(mySavedList);

            const mySavedData = await getMotosListData(mySavedList);
            setListData(mySavedData);
        };

        getData();
    }, [getMotosListData]);

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
