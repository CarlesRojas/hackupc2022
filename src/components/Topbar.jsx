import React from "react";

import Logo from "../resources/icons/mundimoto.png";

export default function TopBar() {
    return (
        <div className="TopBar">
            <img src={Logo} alt="" className="logo" />
        </div>
    );
}
