import React, { useContext, useState } from "react";
import Item from "./Item";

import { Data } from "../contexts/Data";

export default function List() {
    const { listData, removeIdFromList } = useContext(Data);

    const [selected, setSelected] = useState(-1);

    const select = (i) => {
        setSelected((prev) => (prev === i ? -1 : i));
    };

    const closeSelected = () => {
        setSelected(-1);
    };

    return (
        <div className="List">
            {listData.map((data, i) => (
                <Item
                    key={data.id}
                    data={data}
                    selected={i === selected}
                    selectThis={() => select(i)}
                    closeSelected={closeSelected}
                    removeThisFromList={() => removeIdFromList(data.id)}
                />
            ))}
        </div>
    );
}
