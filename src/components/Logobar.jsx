import React from "react";

import Logo from "../resources/icons/mundimoto.png";

export default function Logobar() {
    return (
        <div className="Logobar">
            <img src={Logo} alt="" className="logo" />
        </div>
    );
}
