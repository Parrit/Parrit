import React, { useContext, useState } from "react";
import Modal from "react-modal";

import { PairingBoardList } from "./PairingBoardList";
import { NameForm } from "../../shared/components/NameForm";
import { ProjectContext } from "../ProjectContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FloatingParrits } from "./FloatingParrits";
import { IPairingBoard } from "../interfaces/IPairingBoard";

interface IWorkspaceContext {
  newPersonOpen: boolean;
  newPairingBoardOpen: boolean;
  newRoleOpen: boolean;
  setNewPersonOpen: (isOpen: boolean) => void;
  setNewPairingBoardOpen: (isOpen: boolean) => void;
  setNewRoleOpen: (isOpen: boolean, pairingBoard?: IPairingBoard) => void;
  newPersonError?: Error;
  newPairingBoardError?: Error;
  newRoleError?: Error;
}

export const WorkspaceContext = React.createContext({} as IWorkspaceContext);

export const Workspace: React.FC = (props) => {
  const [newPersonOpen, setNewPersonOpen] = useState(false);
  const [newPairingBoardOpen, setNewPairingBoardOpen] = useState(false);
  const [newRoleOpen, setNewRoleOpen] = useState(false);
  const [newPersonError, setNewPersonError] = useState<Error>();
  const [newPairingBoardError, setNewPairingBoardError] = useState<Error>();
  const [newRoleError, setNewRoleError] = useState<Error>();
  const [newRoleBoard, setNewRoleBoard] = useState<IPairingBoard>();

  const {
    people,
    pairingBoards,
    createPerson,
    createPairingBoard,
    createRole,
  } = useContext(ProjectContext);

  const handleCreatePerson = (name: string) => {
    createPerson(name)
      .then((_) => setNewPersonOpen(false))
      .catch((error) => setNewPersonError(error));
  };

  const handleCreatePairingBoard = (name: string) => {
    createPairingBoard(name)
      .then((_) => setNewPairingBoardOpen(false))
      .catch((error) => setNewPairingBoardError(error));
  };

  const handleCreateNewRole = (name: string) => {
    if (!newRoleBoard) {
      throw new Error("creating a new role without a pairing board");
    }
    createRole(name, newRoleBoard)
      .then((_) => setNewRoleOpen(false))
      .catch((error) => setNewRoleError(error));
  };

  const handleSetNewRoleOpen = (
    open: boolean,
    pairingBoard?: IPairingBoard
  ) => {
    if (open && !pairingBoard) {
      throw new Error("opening a new role dialog without a pairing board");
    }
    setNewRoleOpen(open);
    setNewRoleBoard(pairingBoard);
  };

  const value = {
    newPersonOpen,
    newPairingBoardOpen,
    newRoleOpen,
    setNewPersonOpen,
    setNewPairingBoardOpen,
    setNewRoleOpen: handleSetNewRoleOpen,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      <DndProvider backend={HTML5Backend}>
        <div className="workspace">
          <FloatingParrits people={people} />
          <div className="dotted-line" />
          <div className="pairing-boards-container">
            <h2 className="pairing-boards-title">Pairing Boards</h2>
            <PairingBoardList pairingBoards={pairingBoards} />
            <div
              className="add-board-button"
              onClick={() => setNewPairingBoardOpen(true)}
            />
          </div>

          <Modal
            contentLabel="New Person Modal"
            isOpen={newPersonOpen}
            onRequestClose={() => setNewPersonOpen(false)}
          >
            <NameForm
              formTitle="Add Parrit Teammate"
              confirmFunction={handleCreatePerson}
              cancelFunction={() => setNewPersonOpen(false)}
              errorMessage={newPersonError?.message}
            />
          </Modal>
          <Modal
            contentLabel="New Pairing Board Modal"
            isOpen={newPairingBoardOpen}
            onRequestClose={() => setNewPairingBoardOpen(false)}
          >
            <NameForm
              formTitle="Add Pairing Board"
              confirmFunction={handleCreatePairingBoard}
              cancelFunction={() => setNewPairingBoardOpen(false)}
              errorMessage={newPairingBoardError?.message}
            />
          </Modal>
          <Modal
            contentLabel="New Role Modal"
            isOpen={newRoleOpen}
            onRequestClose={() => setNewRoleOpen(false)}
          >
            <NameForm
              formTitle="Add Pairing Board Role"
              confirmFunction={(value) => {
                handleCreateNewRole(value);
              }}
              cancelFunction={() => setNewRoleOpen(false)}
              errorMessage={newRoleError?.message}
            />
          </Modal>
        </div>
      </DndProvider>
    </WorkspaceContext.Provider>
  );
};
