import React, { useContext, useEffect, useRef, useState } from "react";
import Item from "./Item";

import { Data } from "../contexts/Data";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function List() {
    const { myList, setMyList, listData, setListData, removeIdFromList } = useContext(Data);

    const firstCallDone = useRef(false);
    useEffect(() => {
        if (firstCallDone.current) return;
        firstCallDone.current = true;

        const getMotosData = async () => {
            await sleep(500);

            // Remove this. list should already be updated in Data
            setMyList(["0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008", "0009", "0010"]);

            setListData([
                {
                    id: "0001",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0002",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0003",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0004",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0005",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0006",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0007",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0008",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0009",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
                {
                    id: "0010",
                    name: "Honda RTX Turbo Pro",
                    oldPrice: 10000,
                    price: 7500,
                    licence: "a",
                    cc: 5000,
                    type: "tresRuedas",
                    brand: "honda",
                    year: 2021,
                    km: 16000,
                    image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074/",
                    url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/triumph/speed-triple-r-promo-axsrmejVybOJDUMuhMSO",
                },
            ]);
        };

        getMotosData();
    }, [myList, setListData, setMyList]);

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
