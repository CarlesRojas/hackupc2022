import { createContext, useState } from "react";

export const Data = createContext();
const DataProvider = (props) => {
    const [myList, setMyList] = useState([]);
    const [listData, setListData] = useState([]);

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
