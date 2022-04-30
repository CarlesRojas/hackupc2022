import { createContext } from "react";

const API_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8080"
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

    const getNextMoto = async (medians, myList, filters, totalValuated, sent) => {
        const postData = { medians: { ...medians }, exclude: myList, filters: { ...filters }, totalValuated, sent };

        console.log(JSON.stringify(postData));

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
            console.log(response)
            return response;
        } catch (error) {
            return { error };
        }
    };

    const getLimits = async () => {
        /*
        return {
            year: { min: 1900, max: 2020, median: 1990 },
            cc: { min: 50, max: 5000, median: 2500 },
            km: { min: 0, max: 100000, median: 50000 },
            price: { min: 1000, max: 20000, median: 10000 },
        };
        */

        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/stats/`, {
                method: "get",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });

            const response = await rawResponse.json();

            console.log(response)
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
