import React, { useRef, useState, useContext } from "react";
import SVG from "react-inlinesvg";

import YesIcon from "../resources/icons/check.svg";
import NoIcon from "../resources/icons/cross.svg";
import Card from "./Card";

import { TasteHandler } from "../contexts/TasteHandler";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
    const { likeBike, dislikeBike } = useContext(TasteHandler);

    const [firstState, setFirstState] = useState({
        shown: true,
        blocked: false,
        throwRight: false,
        throwLeft: false,
    });

    const [secondState, setSecondState] = useState({
        shown: false,
        blocked: true,
        throwRight: false,
        throwLeft: false,
    });

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

    const blockButtons = useRef(false);

    const swap = async () => {
        if (firstState.shown) {
            setSecondState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await sleep(500);
            setFirstState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
        } else {
            setFirstState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await sleep(500);
            setFirstState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            setSecondState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
        }
    };

    const swapThrow = async (right) => {
        blockButtons.current = true;

        if (firstState.shown) {
            setFirstState({ shown: true, blocked: true, throwRight: right, throwLeft: !right });
            setSecondState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await sleep(500);
            setFirstState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            blockButtons.current = false;
        } else {
            setFirstState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: true, throwRight: right, throwLeft: !right });
            await sleep(500);
            setFirstState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            setSecondState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            blockButtons.current = false;
        }
    };

    const onValuate = (motoData, like = true) => {
        const rand = Math.random() * 10000;
        const price = Math.random() * 23000;
        const licence = motoData["licence"];
        const cc = Math.random() * 2000;
        const type = motoData["type"];
        const brand = motoData["brand"];
        const year = 1980 + Math.random() * 42;
        const km = Math.random() * 70000;
        if (like) likeBike(price, licence, cc, type, brand, year, km, rand);
        else dislikeBike(price, licence, cc, type, brand, year, km, rand);
    };

    const handleLike = (isButton) => {
        if (isButton && blockButtons.current) return;

        console.log("LIKE");
        const motoData = firstState.shown ? { ...firstMoto } : { ...secondMoto }; 
        onValuate(motoData)

        if (isButton) swapThrow(true);
        else swap();
    };

    const handlePass = (isButton) => {
        if (isButton && blockButtons.current) return;

        console.log("PASS");
        const motoData = firstState.shown ? { ...firstMoto } : { ...secondMoto };
        onValuate(motoData, false)

        if (isButton) swapThrow(false);
        else swap();
    };

    return (
        <div className="Home">
            <div className="cardContainer">
                <Card
                    data={firstMoto}
                    shown={firstState}
                    onLike={() => handleLike(false)}
                    onPass={() => handlePass(false)}
                    id={"first"}
                />
                <Card
                    data={secondMoto}
                    shown={secondState}
                    onLike={() => handleLike(false)}
                    onPass={() => handlePass(false)}
                    id={"second"}
                />
            </div>

            <div className="buttonsContainer">
                <div className="no" onClick={() => handlePass(true)}>
                    <SVG className="icon" src={NoIcon} />
                    <p className="name">Pass</p>
                </div>

                <div className="yes" onClick={() => handleLike(true)}>
                    <SVG className="icon" src={YesIcon} />
                    <p className="name">Like</p>
                </div>
            </div>
        </div>
    );
}
