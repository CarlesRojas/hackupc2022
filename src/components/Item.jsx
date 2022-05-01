import React from "react";
import cn from "classnames";
import SVG from "react-inlinesvg";

import CrossIcon from "../resources/icons/cross.svg";
import useThrottle from "../hooks/useThrottle";

import { BRAND_LOGOS, LICENCES, TYPES } from "./images";

const API_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000"
        : "/api";

const IMG_URL = `${API_URL}/fileManager/image`;

export default function Item({ data, selected, selectThis, removeThisFromList, closeSelected }) {
    const { id, name, old_price, price, licence, cc, type, brand, year, km, url } = data;

    const onCrossClick = useThrottle(() => {
        removeThisFromList();
        closeSelected();
    }, 300);

    return (
        <div className={cn("Item", { selected })}>
            <div className="header">
                <img src={`${IMG_URL}/${id}/`} alt="" className="image" onClick={selectThis} />

                <div className="primaryInfo" onClick={selectThis}>
                    <div className="nameContainer">
                        <img src={BRAND_LOGOS[brand]} alt="" className="brandLogo" />
                        <p className="name">{name}</p>
                    </div>

                    <div className="prices">
                        {old_price && <p className="old_price">{`${old_price.toLocaleString("es-ES")} €`}</p>}
                        <p className="price">{`${price.toLocaleString("es-ES")} €`}</p>
                    </div>
                </div>

                <SVG className="cross" src={CrossIcon} onClick={onCrossClick} />
            </div>

            <div className={cn("footer", { selected })} onClick={selectThis}>
                <div className="row1">
                    <p className="cc">{`${cc.toLocaleString("es-ES")} c.c.`}</p>
                    <p className="km">{`${km.toLocaleString("es-ES")} km`}</p>
                </div>

                <div className="row2">
                    <p className="year">{year}</p>
                    <SVG className="licence" src={LICENCES[licence]} />
                    <div className="type">
                        <SVG className="icon" src={TYPES[type]} />
                        <p className="name">{type}</p>
                    </div>
                </div>

                <div className="buy" onClick={() => window.open(url, "_blank")}>
                    View on Web
                </div>
            </div>
        </div>
    );
}
