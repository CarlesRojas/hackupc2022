import React from "react";

import List from "./List";
import Home from "./Home";
import Filter from "./Filter";
import Logobar from "./Logobar";

export default function DesktopLayout() {
    return (
        <div className="DesktopLayout">
            <Logobar />

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
        </div>
    );
}
