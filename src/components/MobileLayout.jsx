import { useRef } from "react";
import usePageAnimation from "../hooks/usePageAnimation";

import List from "./List.jsx";
import Home from "./Home";
import Filter from "./Filter";
import Navbar from "./Navbar";

const STAGES = ["list", "home", "filter"];

export default function MobileLayout() {
    const currentPage = useRef(0);

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
            <div className="mainPagesContent">{renderedPages}</div>

            <Navbar setPage={setPage} currentPage={currentPage} />
        </div>
    );
}
