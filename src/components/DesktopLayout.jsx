import React, { useContext } from "react";

import List from "./List";
import Home from "./Home";
import Filter from "./Filter";
import Logobar from "./Logobar";

import { Data } from "../contexts/Data";

export default function DesktopLayout() {
    const { loaded } = useContext(Data);

    return (
        <div className="DesktopLayout">
            <Logobar />

            {loaded && (
                <div className="grid">
                    <div className="sectionContainer">
                        <List />
                    </div>

                    <div className="sectionContainer">
                        <Home />
                    </div>

                    <div className="sectionContainer">
                        <Filter />
                    </div>
                </div>
            )}
        </div>
    );
}
