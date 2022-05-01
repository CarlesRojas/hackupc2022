import { createContext } from "react";

const API_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8080"
        : "/api";

export const API = createContext();

const APIProvider = (props) => {
    const getMotosListData = async (mySavedList) => {
        const postData = { bike_ids: mySavedList };

        return mySavedList.map((id) => ({
            id,
            name: "Yamaha RTX Turbo Pro",
            old_price: 10000,
            price: 7500,
            licence: "a",
            cc: 5000,
            type: "scooter",
            brand: "yamaha",
            year: 2021,
            km: 16000,
            image: "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000/fileManager/image/0000000074",
            url: "https://mundimoto.com/es/motos-segunda-mano-ocasion/naked/yamaha/mt-01-promo-1nbD8Jpw62QTzAbPFLHe",
        }));

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

    const getNextMoto = async (medians, myList, filters, totalValuated, sent) => {
        return {
            id: "0000000074",
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
        };
        const postData = { medians: { ...medians }, exclude: myList, filters: { ...filters }, totalValuated, sent };

        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/next/`, {
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

    const getLimits = async () => {
        return {
            year: { min: 1900, max: 2020, avg: 1990 },
            cc: { min: 50, max: 5000, avg: 2500 },
            km: { min: 0, max: 100000, avg: 50000 },
            price: { min: 1000, max: 20000, avg: 10000 },
        };

        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/stats/`, {
                method: "get",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
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
                getLimits,
            }}
        >
            {props.children}
        </API.Provider>
    );
};

export default APIProvider;
