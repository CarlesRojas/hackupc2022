import { useState } from "react";
import cn from "classnames";
import SVG from "react-inlinesvg";
import useThrottle from "../hooks/useThrottle";

import ListIcon from "../resources/icons/list.svg";
import HomeIcon from "../resources/icons/moto.svg";
import FiltersIcon from "../resources/icons/filter.svg";

const PAGES = [
    {
        name: "Your List",
        icon: ListIcon,
    },
    {
        name: "MundiMoto",
        icon: HomeIcon,
    },
    {
        name: "Filters",
        icon: FiltersIcon,
    },
];

export default function Navbar({ setPage, currentPage }) {
    // #################################################
    //   STATE
    // #################################################

    const [selected, updateSelected] = useState(currentPage.current);

    const setSelected = useThrottle((newIndex) => {
        if (selected === newIndex) return;

        currentPage.current = newIndex;
        updateSelected(newIndex);
        setPage(newIndex);
    }, 300);

    // #################################################
    //   RENDER
    // #################################################

    return (
        <div className={"Navbar"}>
            <div className="content">
                {PAGES.map(({ name, icon }, i) => (
                    <div
                        className={cn("container", { selected: selected === i })}
                        onClick={() => setSelected(i)}
                        key={name}
                    >
                        <SVG className="icon" src={icon} />
                        {/* <p className="name">{name}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
