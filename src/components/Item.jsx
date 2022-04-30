import React from "react";
import cn from "classnames";
import SVG from "react-inlinesvg";

import CrossIcon from "../resources/icons/cross.svg";
import useThrottle from "../hooks/useThrottle";

import apriliaBrand from "../resources/icons/brands/aprilia.png";
import benelliBrand from "../resources/icons/brands/benelli.png";
import bmwBrand from "../resources/icons/brands/bmw.png";
import brixtonBrand from "../resources/icons/brands/brixton.png";
import cakeBrand from "../resources/icons/brands/cake.png";
import cfmotoBrand from "../resources/icons/brands/cfmoto.png";
import daelimBrand from "../resources/icons/brands/daelim.png";
import derbiBrand from "../resources/icons/brands/derbi.png";
import ducatiBrand from "../resources/icons/brands/ducati.png";
import fanticBrand from "../resources/icons/brands/fantic.png";
import fbMondialBrand from "../resources/icons/brands/fbMondial.png";
import fkMotorsBrand from "../resources/icons/brands/fkMotors.png";
import gasGasBrand from "../resources/icons/brands/gasGas.png";
import gileraBrand from "../resources/icons/brands/gilera.png";
import goesBrand from "../resources/icons/brands/goes.png";
import hanwayBrand from "../resources/icons/brands/hanway.png";
import harleydavidsonBrand from "../resources/icons/brands/harleyDavidson.png";
import hondaBrand from "../resources/icons/brands/honda.png";
import husabergBrand from "../resources/icons/brands/husaberg.png";
import husqvarnaBrand from "../resources/icons/brands/husqvarna.png";
import indianBrand from "../resources/icons/brands/indian.png";
import kawasakiBrand from "../resources/icons/brands/kawasaki.png";
import keewayBrand from "../resources/icons/brands/keeway.png";
import ktmBrand from "../resources/icons/brands/ktm.png";
import kymcoBrand from "../resources/icons/brands/kymco.png";
import lmlBrand from "../resources/icons/brands/lml.png";
import macborBrand from "../resources/icons/brands/macbor.png";
import mashBrand from "../resources/icons/brands/mash.png";
import mittBrand from "../resources/icons/brands/mitt.png";
import motoGuzziBrand from "../resources/icons/brands/motoGuzzi.png";
import motorHispaniaBrand from "../resources/icons/brands/motorHispania.png";
import mvAgustaBrand from "../resources/icons/brands/mvAgusta.png";
import orcalBrand from "../resources/icons/brands/orcal.png";
import peugeotBrand from "../resources/icons/brands/peugeot.png";
import piaggioBrand from "../resources/icons/brands/piaggio.png";
import quadroBrand from "../resources/icons/brands/quadro.png";
import riejuBrand from "../resources/icons/brands/rieju.png";
import royalEnfieldBrand from "../resources/icons/brands/royalEnfield.png";
import suzukiBrand from "../resources/icons/brands/suzuki.png";
import swmBrand from "../resources/icons/brands/swm.png";
import symBrand from "../resources/icons/brands/sym.png";
import triumphBrand from "../resources/icons/brands/triumph.png";
import umBrand from "../resources/icons/brands/um.png";
import vespaBrand from "../resources/icons/brands/vespa.png";
import vogeBrand from "../resources/icons/brands/voge.png";
import yamahaBrand from "../resources/icons/brands/yamaha.png";
import zontesBrand from "../resources/icons/brands/zontes.png";

import aLicense from "../resources/icons/licenses/a.svg";
import a1bLicense from "../resources/icons/licenses/a1-b.svg";
import a2License from "../resources/icons/licenses/a2.svg";
import amLicense from "../resources/icons/licenses/am.svg";

import classicType from "../resources/icons/type/classic.svg";
import customType from "../resources/icons/type/custom.svg";
import maxiScooterType from "../resources/icons/type/maxi-scooter.svg";
import nakedType from "../resources/icons/type/naked.svg";
import offRoadType from "../resources/icons/type/off-road.svg";
import scooterType from "../resources/icons/type/scooter.svg";
import sportType from "../resources/icons/type/sport.svg";
import touringType from "../resources/icons/type/touring.svg";
import trailType from "../resources/icons/type/trail.svg";
import tresRuedasType from "../resources/icons/type/tres-ruedas.svg";

const BRAND_LOGOS = {
    aprilia: apriliaBrand,
    benelli: benelliBrand,
    bmw: bmwBrand,
    brixton: brixtonBrand,
    cake: cakeBrand,
    cfmoto: cfmotoBrand,
    daelim: daelimBrand,
    derbi: derbiBrand,
    ducati: ducatiBrand,
    fantic: fanticBrand,
    fbMondial: fbMondialBrand,
    fkMotors: fkMotorsBrand,
    fkm: fkMotorsBrand,
    gasGas: gasGasBrand,
    gilera: gileraBrand,
    goes: goesBrand,
    hanway: hanwayBrand,
    harleydavidson: harleydavidsonBrand,
    honda: hondaBrand,
    husaberg: husabergBrand,
    husqvarna: husqvarnaBrand,
    indian: indianBrand,
    kawasaki: kawasakiBrand,
    keeway: keewayBrand,
    ktm: ktmBrand,
    kymco: kymcoBrand,
    lml: lmlBrand,
    macbor: macborBrand,
    mash: mashBrand,
    mitt: mittBrand,
    motoGuzzi: motoGuzziBrand,
    motorHispania: motorHispaniaBrand,
    mvAgusta: mvAgustaBrand,
    orcal: orcalBrand,
    peugeot: peugeotBrand,
    piaggio: piaggioBrand,
    quadro: quadroBrand,
    rieju: riejuBrand,
    royalEnfield: royalEnfieldBrand,
    suzuki: suzukiBrand,
    swm: swmBrand,
    sym: symBrand,
    triumph: triumphBrand,
    um: umBrand,
    vespa: vespaBrand,
    voge: vogeBrand,
    yamaha: yamahaBrand,
    zontes: zontesBrand,
};
const LICENCES = { a: aLicense, a1b: a1bLicense, a2: a2License, am: amLicense };

const TYPES = {
    classic: classicType,
    custom: customType,
    maxiScooter: maxiScooterType,
    naked: nakedType,
    offRoad: offRoadType,
    scooter: scooterType,
    sport: sportType,
    touring: touringType,
    trail: trailType,
    tresRuedas: tresRuedasType,
};

export default function Item({ data, selected, selectThis, removeThisFromList, closeSelected }) {
    const { id, name, oldPrice, price, licence, cc, type, brand, year, km, image, url } = data;

    const onCrossClick = useThrottle(() => {
        removeThisFromList();
        closeSelected();
    }, 300);

    return (
        <div className={cn("Item", { selected })}>
            <div className="header">
                <img src={image} alt="" className="image" onClick={selectThis} />

                <div className="primaryInfo" onClick={selectThis}>
                    <div className="nameContainer">
                        <img src={BRAND_LOGOS[brand]} alt="" className="brandLogo" />
                        <p className="name">{name}</p>
                    </div>
                    <div className="prices">
                        <p className="oldPrice">{`${oldPrice.toLocaleString("es-ES")} €`}</p>
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
                    Comprar
                </div>
            </div>
        </div>
    );
}
