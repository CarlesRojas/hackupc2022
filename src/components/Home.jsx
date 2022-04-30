import React, { useRef, useState, useContext } from "react";
import SVG from "react-inlinesvg";

import YesIcon from "../resources/icons/check.svg";
import NoIcon from "../resources/icons/cross.svg";
import Card from "./Card";

import { TasteHandler } from "../contexts/TasteHandler";
import { Data } from "../contexts/Data";

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
    const { firstMoto, secondMoto, loadNextMoto, addToMyList } = useContext(Data);
    const { likeBike, dislikeBike } = useContext(TasteHandler);

    const startTime = useRef(performance.now());

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

    const blockButtons = useRef(false);

    const swap = async () => {
        if (firstState.shown) {
            setSecondState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await loadNextMoto(true);
            // await sleep(500);
            setFirstState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
        } else {
            setFirstState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await loadNextMoto(false);
            // await sleep(500);
            setFirstState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            setSecondState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
        }
    };

    const swapThrow = async (right) => {
        blockButtons.current = true;

        if (firstState.shown) {
            setFirstState({ shown: true, blocked: true, throwRight: right, throwLeft: !right });
            setSecondState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            await loadNextMoto(true);
            // await sleep(500);
            setFirstState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            blockButtons.current = false;
        } else {
            setFirstState({ shown: true, blocked: true, throwRight: false, throwLeft: false });
            setSecondState({ shown: true, blocked: true, throwRight: right, throwLeft: !right });
            await loadNextMoto(false);
            // await sleep(500);
            setFirstState({ shown: true, blocked: false, throwRight: false, throwLeft: false });
            setSecondState({ shown: false, blocked: true, throwRight: false, throwLeft: false });
            blockButtons.current = false;
        }
    };

    const onValuate = (motoData, like = true) => {
        const endTime = performance.now();
        const elapsed = Math.min(endTime - startTime.current, 10000);
        startTime.current = endTime;

        const price = motoData.price;
        const licence = motoData.licence;
        const cc = motoData.cc;
        const type = motoData.type;
        const brand = motoData.brand;
        const year = motoData.year;
        const km = motoData.km;

        if (like) {
            likeBike(price, licence, cc, type, brand, year, km, elapsed);

            addToMyList(motoData.id, motoData);
        } else dislikeBike(price, licence, cc, type, brand, year, km, elapsed);
    };

    const handleLike = (isButton) => {
        if (isButton && blockButtons.current) return;

        const motoData = firstState.shown ? { ...firstMoto } : { ...secondMoto };
        onValuate(motoData);

        if (isButton) swapThrow(true);
        else swap();
    };

    const handlePass = (isButton) => {
        if (isButton && blockButtons.current) return;

        const motoData = firstState.shown ? { ...firstMoto } : { ...secondMoto };
        onValuate(motoData, false);

        if (isButton) swapThrow(false);
        else swap();
    };

    return (
        <div className="Home">
            <div className="cardContainer">
                {firstMoto && (
                    <Card
                        data={firstMoto}
                        shown={firstState}
                        onLike={() => handleLike(false)}
                        onPass={() => handlePass(false)}
                        cardId={"first"}
                    />
                )}

                {secondMoto && (
                    <Card
                        data={secondMoto}
                        shown={secondState}
                        onLike={() => handleLike(false)}
                        onPass={() => handlePass(false)}
                        cardId={"second"}
                    />
                )}
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
