import { createContext } from "react";

// const API_VERSION = "api_v1";
const API_URL = "http://ec2-15-237-75-238.eu-west-3.compute.amazonaws.com:8000";

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
            console.log(response);

            return response;
        } catch (error) {
            return { error };
        }
    };

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
