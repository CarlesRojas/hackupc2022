import { StrictMode } from "react";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";

// Contexts
import EventsProvider from "./contexts/Events";
import UtilsProvider from "./contexts/Utils";
import APIProvider from "./contexts/API";
import GlobalStateProvider from "./contexts/GlobalState";
import DataProvider from "./contexts/Data";
import MediaQueryProvider from "./contexts/MediaQuery";
import TasteHandlerProvider from "./contexts/TasteHandler";

ReactDOM.render(
    <StrictMode>
        <EventsProvider>
            <UtilsProvider>
                <GlobalStateProvider>
                    <APIProvider>
                        <DataProvider>
                            <TasteHandlerProvider>
                                <MediaQueryProvider>
                                    <App />
                                </MediaQueryProvider>
                            </TasteHandlerProvider>
                        </DataProvider>
                    </APIProvider>
                </GlobalStateProvider>
            </UtilsProvider>
        </EventsProvider>
    </StrictMode>,
    document.getElementById("root")
);

serviceWorker.register();
