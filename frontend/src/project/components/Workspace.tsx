import React, { useState } from "react";
import Modal from "react-modal";

import { PersonList } from "./PersonList";
import { TrashBin } from "./TrashBin";
import { PairingBoardList } from "./PairingBoardList";
import { NameForm } from "../../shared/components/NameForm";
import * as DatabaseHelpers from "../../shared/helpers/DatabaseHelpers.js";

interface Props {
  projectId: number;
  people: IPerson[];
  pairingBoards: IPairingBoard[];
}

interface IWorkspaceContext {
  newPersonOpen: boolean;
  newPairingBoardOpen: boolean;
  newRoleOpen: boolean;
  setNewPersonOpen: (isOpen: boolean) => void;
  setNewPairingBoardOpen: (isOpen: boolean) => void;
  setNewRoleOpen: (isOpen: boolean) => void;
  people: IPerson[];
  createPerson: (name: string) => Promise<IPerson>;
  createPairingBoard: (name: string) => Promise<IPairingBoard>;
  createRole: (name: string, pairingBoard: IPairingBoard) => Promise<IRole>;
  movePerson: (person: IPerson, position: IPosition) => void;
  deletePerson: (person: IPerson) => Promise<any>;
  deletePairingBoard: (pairingBoard: IPairingBoard) => Promise<any>;
  projectId: number;
}

export const WorkspaceContext = React.createContext({} as IWorkspaceContext);

export const Workspace: React.FC<Props> = (props) => {
  const [newPersonOpen, setNewPersonOpen] = useState(false);
  const [newPairingBoardOpen, setNewPairingBoardOpen] = useState(false);
  const [newRoleOpen, setNewRoleOpen] = useState(false);
  const [newPersonError, setNewPersonError] = useState<string>();
  const [newPairingBoardError, setNewPairingBoardError] = useState<string>();
  const [newRoleError, setNewRoleError] = useState<string>();
  const [people, setPeople] = useState<IPerson[]>(props.people);
  const [pairingBoards, setPairingBoards] = useState<IPairingBoard[]>(
    props.pairingBoards
  );

  const createPerson = (name: string) => {
    return DatabaseHelpers.postPerson(props.projectId, name)
      .then((person) => {
        setPeople((oldPeople) => {
          return [...oldPeople, person];
        });
        setNewPersonOpen(false);
        return person;
      })
      .catch((error) => {
        console.log("newPersonError", error);
        setNewPersonError(error);
        throw error;
      });
  };

  const createPairingBoard = (name: string) => {
    return DatabaseHelpers.postPairingBoard(props.projectId, name)
      .then((pairingBoard) => {
        setPairingBoards((oldPairingBoards) => {
          return [...oldPairingBoards, pairingBoard];
        });
        setNewPairingBoardOpen(false);
        return pairingBoard;
      })
      .catch((error) => {
        console.log("newPairingBoardError", error);
        setNewPairingBoardError(error);
        throw error;
      });
  };

  const deletePairingBoard = (pairingBoard: IPairingBoard) => {
    return DatabaseHelpers.deletePairingBoard(props.projectId, pairingBoard.id);
  };

  const createRole = (name: string, pairingBoard: IPairingBoard) => {
    return DatabaseHelpers.postRole(props.projectId, pairingBoard.id, name)
      .then((role) => {
        setNewRoleOpen(false);
        return role;
      })
      .catch((error) => {
        console.log("newRoleError", error);
        setNewRoleError(error);
        throw error;
      });
  };

  const movePerson = (person: IPerson, position: IPosition) => {};

  const deletePerson = (person: IPerson) => {
    return DatabaseHelpers.deletePerson(props.projectId, person.id);
  };

  const value = {
    newPersonOpen,
    newPairingBoardOpen,
    newRoleOpen,
    createPerson,
    createPairingBoard,
    createRole,
    setNewPersonOpen,
    setNewPairingBoardOpen,
    setNewRoleOpen,
    movePerson,
    deletePerson,
    people,
    pairingBoards,
    projectId: props.projectId,
    deletePairingBoard,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      <div className="workspace">
        <div className="floating-parrits">
          <h2 className="floating-parrit-title">Floating Parrits</h2>
          <PersonList people={props.people} />
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
            confirmFunction={createPerson}
            cancelFunction={() => setNewPersonOpen(false)}
            errorMessage={newPersonError}
          />
        </Modal>
        <Modal
          contentLabel="New Pairing Board Modal"
          isOpen={newPairingBoardOpen}
          onRequestClose={() => setNewPairingBoardOpen(false)}
        >
          <NameForm
            formTitle="Add Pairing Board"
            confirmFunction={createPairingBoard}
            cancelFunction={() => setNewPairingBoardOpen(false)}
            errorMessage={newPairingBoardError}
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

// function mapStateToProps({ data, settings }: any) {
//   return {
//     people: data.project.people,
//     settings: settings,
//   };
// }

// const mapDispatchToProps = {
//   createPerson: addNewPersonThunk,
//   createPairingBoard: addNewPairingBoardThunk,
//   createRole: addNewRoleThunk,
//   setNewPersonModalOpen: setNewPersonModalOpenCreator,
//   setNewPairingBoardModalOpen: setNewPairingBoardModalOpenCreator,
//   setNewRoleModalOpen: setNewRoleModalOpenCreator,
// };
