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

    useEffect(() => {
        const getSavedData = async () => {
            // const mySavedList = ["0000000074", "0000000075", "0000000076"];
            const mySavedList = JSON.parse(localStorage.getItem("mundimoto_myList")) || [];
            setMyList(mySavedList);

            const mySavedData = await getMotosListData(mySavedList);
            setListData(mySavedData);
        };

        getSavedData();
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
            }}
        >
            {props.children}
        </Data.Provider>
    );
};

export default DataProvider;
