import React, { useRef, useState } from "react";
import SVG from "react-inlinesvg";
import useThrottle from "../hooks/useThrottle";

import YesIcon from "../resources/icons/check.svg";
import NoIcon from "../resources/icons/cross.svg";
import Card from "./Card";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
    const [firstShown, setFirstShown] = useState({ shown: true, blocked: false });
    const [secondShown, setSecondShown] = useState({ shown: false, blocked: true });

    const [firstMoto, setFirstMoto] = useState({
        id: "0001",
        name: "Yamaha RTX Turbo Pro",
        oldPrice: 10000,
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
        id: "0001",
        name: "Yamaha RTX Turbo Pro",
        oldPrice: 10000,
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

    const swap = async () => {
        if (firstShown.shown) {
            setSecondShown({ shown: true, blocked: true });
            await sleep(500);
            setFirstShown({ shown: false, blocked: true });
            setSecondShown({ shown: true, blocked: false });
        } else {
            setFirstShown({ shown: true, blocked: true });
            await sleep(500);
            setFirstShown({ shown: true, blocked: false });
            setSecondShown({ shown: false, blocked: true });
        }
    };

    const handleLike = useThrottle((newIndex) => {
        console.log("LIKE");
        swap();
    }, 300);

    const handlePass = useThrottle((newIndex) => {
        console.log("PASS");
        swap();
    }, 300);

    return (
        <div className="Home">
            <div className="cardContainer">
                <Card data={firstMoto} shown={firstShown} onLike={handleLike} onPass={handlePass} id={"first"} />
                <Card data={secondMoto} shown={secondShown} onLike={handleLike} onPass={handlePass} id={"second"} />
            </div>

            <div className="buttonsContainer">
                <div className="no" onClick={handlePass}>
                    <SVG className="icon" src={NoIcon} />
                    <p className="name">Pass</p>
                </div>

                <div className="yes" onClick={handleLike}>
                    <SVG className="icon" src={YesIcon} />
                    <p className="name">Like</p>
                </div>
            </div>
        </div>
    );
}
