import { useRef, useContext } from "react";
import usePageAnimation from "../hooks/usePageAnimation";
import { Data } from "../contexts/Data";

import List from "./List.jsx";
import Home from "./Home";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Logobar from "./Logobar";

const STAGES = ["filter", "home", "list"];

export default function MobileLayout() {
    const { loaded } = useContext(Data);
    const currentPage = useRef(1);

    const animationSpeed = 300;
    const content = STAGES.map((id) => {
        if (id === "list") return <List />;
        else if (id === "home") return <Home />;
        else if (id === "filter") return <Filter />;
        else return null;
    });
    const [{ renderedPages, setPage }] = usePageAnimation({
        pagesIds: STAGES,
        pagesContents: content,
        containerClass: "mainPages",
        animationSpeed,
        animateFirst: false,
        initialPage: currentPage.current,
    });

    return (
        <div className="MobileLayout">
            <Logobar />

            {loaded && (
                <>
                    <div className="mainPagesContent">{renderedPages}</div>
                    <Navbar setPage={setPage} currentPage={currentPage} />
                </>
            )}
        </div>
    );
}
