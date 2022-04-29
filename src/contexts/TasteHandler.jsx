import { createContext, useRef } from "react";

export const TasteHandler = createContext();
const TasteHandlerProvider = (props) => {

    const tastes = useRef({
        price: {
            "0-1000": 0,
            "1000-1500": 0,
            "1500-2500": 0,
            "2500-3000": 0,
            "3000-5000": 0,
            "5000-7500": 0,
            "7500-10000": 0,
            "10000-15000": 0,
            "15000-20000": 0,
            "20000-23000": 0
        },
        license: {
            "am": 0,
            "a1/b": 0,
            "a2": 0,
            "a": 0
        },
        cubic_centimerers: {
            "0-50": 0,
            "50-125": 0,
            "125-250": 0,
            "250-500": 0,
            "500-700": 0,
            "1000-1500": 0,
            "1500-2000": 0
        },
        type: {
            scooter: 0,
            maxi_scooter: 0,
            classic: 0,
            naked: 0,
            sport: 0,
            touring: 0,
            trail: 0,
            off_road: 0,
            custom: 0,
            tree_weels: 0,
        },
        brand: {
            "aprilia": 0,
            "benelli": 0,
            "bmw": 0,
            "brixton": 0,
            "cake motorbikes": 0,
            "cfmoto": 0,
            "daelim": 0,
            "derbi": 0,
            "ducati": 0,
            "fantic": 0,
            "fb mondial": 0,
            "fk motors": 0,
            "fkm": 0,
            "gas gas": 0,
            "gilera": 0,
            "goes": 0,
            "hanway": 0,
            "harley davidson": 0,
            "honda": 0,
            "husaberg": 0,
            "husqvarna": 0,
            "indian": 0,
            "kawasaki": 0,
            "keeway": 0,
            "ktm": 0,
            "kymco": 0,
            "lml": 0,
            "macbor": 0,
            "mash": 0,
            "mitt": 0,
            "moto guzzi": 0,
            "motor hispania": 0,
            "mv agusta": 0,
            "orcal": 0,
            "peugeot": 0,
            "piaggio": 0,
            "quadro": 0,
            "rieju": 0,
            "royal enfield": 0,
            "suzuki": 0,
            "swm": 0,
            "sym": 0,
            "triumph": 0,
            "um": 0,
            "vespa": 0,
            "voge": 0,
            "yamaha": 0,
            "zontes": 0
        },
        year: {
            "1980-1985": 0,
            "1985-1990": 0,
            "1990-1995": 0,
            "1995-2000": 0,
            "2000-2005": 0,
            "2005-2010": 0,
            "2010-2015": 0,
            "2015-2020": 0,
            "2020-now": 0
        },
        mileage: {
            "0-10000": 0,
            "10000-20000": 0,
            "20000-30000": 0,
            "30000-40000": 0,
            "40000-50000": 0,
            "50000-60000": 0,
            "60000-70000": 0
        }
    })

    return (
        <TasteHandler.Provider
            value={{
                tastes,
            }}
        >
            {props.children}
        </TasteHandler.Provider>
    );
};

export default TasteHandlerProvider;
