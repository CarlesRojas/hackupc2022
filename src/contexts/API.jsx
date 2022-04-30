import { createContext } from "react";

// const API_VERSION = "api_v1";
const API_URL = "/api";

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

    const getNextMoto = async (tastesPct, mySavedList) => {
        const postData = {...tastesPct, exclude: mySavedList};
        try {
            const rawResponse = await fetch(`${API_URL}/motorbikes/next/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })

            const response = await rawResponse.json();
            
            return response;
        } catch (error) {
            return { error };
        }
    }

    return (
        <API.Provider
            value={{
                getMotosListData,
            }}
        >
            {props.children}
        </API.Provider>
    );
};

export default APIProvider;
