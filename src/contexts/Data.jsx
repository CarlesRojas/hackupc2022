import { createContext, useEffect, useState } from "react";

export const Data = createContext();
const DataProvider = (props) => {
    const [myList, setMyList] = useState(localStorage.getItem("mundimoto_myList"), []);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        localStorage.setItem("mundimoto_myList", myList);
        console.log(myList);
    }, [myList])

    const addToMyList = (id, data) => {
        setMyList([...myList], id);
        setListData([...listData], { ...data });
    };

    const removeIdFromList = (id) => {
        const index = myList.findIndex((element) => element === id);

        const newMyList = [...myList];
        newMyList.splice(index, 1);
        setMyList(newMyList);

        const newListData = [...listData];
        newListData.splice(index, 1);
        setListData(newListData);
    };

    useEffect(() => {
        const getSavedData = async () => {
            // TODO GET THIS FROM LOCAL STORAGE
            const mySavedList = ["0000000074", "0000000075", "0000000076"];
            setMyList(mySavedList);

            const mySavedData = await getMotosListData(mySavedList);
            setListData(mySavedData);
        };

        console.log("ONLY ONCE");
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
