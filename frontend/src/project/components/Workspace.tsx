import React, { useContext, useState } from "react";
import Modal from "react-modal";

import { PersonList } from "./PersonList";
import { TrashBin } from "./TrashBin";
import { PairingBoardList } from "./PairingBoardList";
import { NameForm } from "../../shared/components/NameForm";
import { ProjectContext } from "../ProjectContext";

interface IWorkspaceContext {
  newPersonOpen: boolean;
  newPairingBoardOpen: boolean;
  newRoleOpen: boolean;
  setNewPersonOpen: (isOpen: boolean) => void;
  setNewPairingBoardOpen: (isOpen: boolean) => void;
  setNewRoleOpen: (isOpen: boolean) => void;
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

  const value = {
    newPersonOpen,
    newPairingBoardOpen,
    newRoleOpen,
    setNewPersonOpen,
    setNewPairingBoardOpen,
    setNewRoleOpen,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      <div className="workspace">
        <div className="floating-parrits">
          <h2 className="floating-parrit-title">Floating Parrits</h2>
          <PersonList people={people} />
          <div className="floating-parrit-actions">
            <div
              className="add-parrit-button"
              onClick={() => setNewPersonOpen(true)}
            />
            <TrashBin />
          </div>
        </div>

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
          {/* <NameForm
            formTitle="Add Pairing Board Role"
            confirmFunction={(value) => {
              createRole(value, )
            }}
            cancelFunction={() => setNewRoleOpen(false)}
            errorMessage={newRoleError}
          /> */}
        </Modal>
      </div>
    </WorkspaceContext.Provider>
  );
};
