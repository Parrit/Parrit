import React, { createContext, useState } from "react";
import { SystemAlert } from "./SystemAlert";
import { Header } from "./Header";
import { Project } from "./Project";
import { PairingHistory } from "./PairingHistory.js";
import { Footer } from "../../shared/components/Footer";
import { CustomDragLayer } from "./CustomDragLayer";
import { DragItem } from "../interfaces/DragItem";
import { ProjectContext, ProjectProvider } from "../ProjectContext";

interface Props {
  project: IProject;
}

interface IAppContext {
  pairingHistoryOpen: boolean;
  setPairingHistoryOpen: (isOpen: boolean) => void;
  systemAlertOpen: boolean;
  setSystemAlertOpen: (isOpen: boolean) => void;
  projectId: number;
  dragItem?: DragItem;
  isDragging: boolean;
  currentOffset: Offset;
}

export const AppContext = createContext({} as IAppContext);

export const App: React.FC<Props> = (props) => {
  const [systemAlertOpen, setSystemAlertOpen] = useState(false);
  const [pairingHistoryOpen, setPairingHistoryOpen] = useState(false);
  const [dragItem, setDragItem] = useState<DragItem>();
  const [isDragging, setIsDragging] = useState(false);
  const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 });
  const projectId = props.project.id;

  const className =
    "layout-wrapper project-page-container" + pairingHistoryOpen
      ? "shift-left"
      : "";

  const value = {
    systemAlertOpen,
    setSystemAlertOpen,
    pairingHistoryOpen,
    setPairingHistoryOpen,
    projectId,
    dragItem,
    isDragging,
    currentOffset,
  };

  return (
    <React.Fragment>
      <AppContext.Provider value={value}>
        <ProjectProvider project={props.project}>
          <div className={className}>
            <SystemAlert close={() => setSystemAlertOpen(false)} />
            <Header
              isPairingHistoryPanelOpen={pairingHistoryOpen}
              setPairingHistoryPanelOpen={setPairingHistoryOpen}
            />
            <Project />
            <Footer />
            <PairingHistory />
          </div>
          <CustomDragLayer />
        </ProjectProvider>
      </AppContext.Provider>
    </React.Fragment>
  );
};
