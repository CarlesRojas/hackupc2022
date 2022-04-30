import { createContext, useRef } from "react";

const API_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000"
        : "/api";

export const API = createContext();

const APIProvider = (props) => {
    const getMotosListData = async (mySavedList) => {
        const postData = { bike_ids: mySavedList };

        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/favourites/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error };
        }
    };

    const motos = useRef([]);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const getNextMoto = async (tastesPct, mySavedList) => {
        let motosCopy = [...motos.current];

        if (motos.current.length > 0) motosCopy.shift();

        if (motosCopy.length <= 1) {
            const nextThreeMotos = await getNextThreeMotos(tastesPct, mySavedList);
            motosCopy = motosCopy.concat(nextThreeMotos);
        } else {
            await sleep(400);
        }
        motos.current = motosCopy;

        return motos.current[0];
    };

    const getNextThreeMotos = async (tastesPct, mySavedList) => {
        const postData = { ...tastesPct, exclude: mySavedList };
        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/nextOld/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error };
        }
    };

    return (
        <API.Provider
            value={{
                getMotosListData,
                getNextMoto,
            }}
        >
            {props.children}
        </API.Provider>
    );
};

export default APIProvider;
