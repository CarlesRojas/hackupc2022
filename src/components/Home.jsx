import React, { useState } from "react";
import SVG from "react-inlinesvg";
import useThrottle from "../hooks/useThrottle";

import YesIcon from "../resources/icons/check.svg";
import NoIcon from "../resources/icons/cross.svg";
import Card from "./Card";

export default function Home() {
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

    const handleLike = useThrottle((newIndex) => {
        console.log("LIKE");
    }, 300);

    const handlePass = useThrottle((newIndex) => {
        console.log("PASS");
    }, 300);

    return (
        <div className="Home">
            <div className="cardContainer">
                <Card data={firstMoto} state={"front"} onLike={handleLike} onPass={handlePass} />
                {/* <Card data={secondMoto} state={"back"} onLike={handleLike} onPass={handlePass} /> */}
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
