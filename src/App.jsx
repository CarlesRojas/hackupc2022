import { useContext } from "react";
import DesktopLayout from "./components/DesktopLayout";
import MobileLayout from "./components/MobileLayout";

import { MediaQuery } from "./contexts/MediaQuery";

export default function App() {
    const { isMobile, isTablet, isMobileSize, isLandscape } = useContext(MediaQuery);

    return isMobile || isMobileSize || (isTablet && !isLandscape) ? <MobileLayout /> : <DesktopLayout />;
}
