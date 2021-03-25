import React, { createContext, useState } from "react";
import { SystemAlert } from "./SystemAlert";
import { Header } from "./Header";
import { Project } from "./Project";
import { PairingHistory } from "./PairingHistory.js";
import { Footer } from "../../shared/components/Footer";
import { ProjectProvider } from "../ProjectContext";
import { IProject } from "../interfaces/IProject";
import classNames from "classnames";
import { ApiProvider } from "../../shared/helpers/ApiContext";

interface Props {
  project: IProject;
}

export interface IAppContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlert?: string;
  setSystemAlert: (value?: string) => void;
}

export const AppContext = createContext({} as IAppContext);

export const App: React.FC<Props> = (props) => {
  const [systemAlert, setSystemAlert] = useState<string>();
  const [pairingHistoryOpen, setPairingHistoryOpen] = useState(false);

  const classes = classNames({
    "layout-wrapper": true,
    "project-page-container": true,
    "shift-left": pairingHistoryOpen,
  });

  const value = {
    systemAlert,
    setSystemAlert,
    pairingHistoryOpen,
    setPairingHistoryOpen,
  };

  return (
    <div className={classes}>
      <AppContext.Provider value={value}>
        <ApiProvider>
          <ProjectProvider project={props.project}>
            <SystemAlert />
            <Header />
            <Project />
            <Footer />
            <PairingHistory />
          </ProjectProvider>
        </ApiProvider>
      </AppContext.Provider>
    </div>
  );
};
