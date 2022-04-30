import React, { useCallback, useEffect, useRef } from "react";
import SVG from "react-inlinesvg";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

import { BRAND_LOGOS, LICENCES, TYPES } from './images'

export default function Card({ data, shown, onLike, onPass, id }) {
    const { /*id,*/ name, oldPrice, price, licence, cc, type, brand, year, km, image /*, url*/ } = data;

    const [{ x, scale, opacity }, api] = useSpring(() => ({
        x: 0,
        scale: 0.5,
        opacity: 0,
    }));

    const swipingRight = useRef(true);

    const throwRight = useCallback(
        (callParentFunction) => {
            api.start({
                x: window.innerWidth,
                scale: 1,
                opacity: 0,
            });

            if (callParentFunction) onLike();
        },
        [api, onLike]
    );

    const throwLeft = useCallback(
        (callParentFunction) => {
            api.start({
                x: -window.innerWidth,
                scale: 1,
                opacity: 0,
            });

            if (callParentFunction) onPass();
        },
        [api, onPass]
    );

    const center = useCallback(() => {
        api.start({
            x: 0,
            scale: 1,
            opacity: 1,
        });
    }, [api]);

    const hide = useCallback(() => {
        api.start({
            x: 0,
            scale: 0.5,
            opacity: 0,
            immediate: true,
        });
    }, [api]);

    const horizontalGestureBind = useDrag(
        ({ event, cancel, canceled, down, movement: [mx], velocity: [vx], direction: [xDir] }) => {
            event.stopPropagation();

            if (canceled) return;

            const throwAway = vx > 1.5 || Math.abs(mx) > window.innerWidth * 0.6;

            if (!down) {
                if (throwAway && swipingRight.current) throwRight(true);
                else if (throwAway) throwLeft(true);
                else center();
            } else {
                if (throwAway && swipingRight.current) {
                    throwRight(true);
                    cancel();
                    return;
                } else if (throwAway) {
                    throwLeft(true);
                    cancel();
                    return;
                }

                const dir = xDir < 0 ? -1 : 1;
                swipingRight.current = dir >= 0;

                api.start({
                    x: mx,
                    scale: 1,
                    opacity: 1,
                });
            }
        },
        { filterTaps: true, axis: "x" }
    );

    useEffect(() => {
        if (shown.shown) {
            center();
        } else {
            hide();
        }
    }, [center, hide, shown]);

    useEffect(() => {
        if (shown.throwRight) throwRight(false);
        else if (shown.throwLeft) throwLeft(false);
    }, [throwRight, throwLeft, shown]);

    // First time only
    const firstTimeDone = useRef(false);
    useEffect(() => {
        if (firstTimeDone.current) return;
        firstTimeDone.current = true;

        if (shown.shown) center();
    }, [center, shown]);

    return (
        <animated.div
            className="Card"
            style={{ x, scale, opacity, pointerEvents: shown.blocked ? "none" : "all" }}
            {...horizontalGestureBind()}
        >
            <div className="pictureContainer">
                <img src={image} alt="" className="picture" />
            </div>

            <div className="info">
                <div className="groupRows">
                    <div className="row1">
                        <img src={BRAND_LOGOS[brand]} alt="" className="brandLogo" />
                        <p className="name">{name}</p>
                    </div>

                    <div className="row2">
                        <p className="cc">{`${cc.toLocaleString("es-ES")} c.c.`}</p>
                        <p className="km">{`${km.toLocaleString("es-ES")} km`}</p>
                    </div>
                </div>

                <div className="row3">
                    <p className="oldPrice">{`${oldPrice.toLocaleString("es-ES")} €`}</p>
                    <p className="price">{`${price.toLocaleString("es-ES")} €`}</p>
                </div>

                <div className="row4">
                    <p className="year">{year}</p>
                    <SVG className="licence" src={LICENCES[licence]} />
                    <div className="type">
                        <SVG className="icon" src={TYPES[type]} />
                        <p className="name">{type}</p>
                    </div>
                </div>
            </div>
        </animated.div>
    );
}
