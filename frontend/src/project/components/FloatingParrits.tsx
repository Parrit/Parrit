import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { DragType, DropType } from "../interfaces/DragAndDrop";
import { IPerson } from "../interfaces/IPerson";
import { ProjectContext } from "../ProjectContext";
import { PersonList } from "./PersonList";
import { TrashBin } from "./TrashBin";
import { WorkspaceContext } from "./Workspace";

interface Props {
  people: IPerson[];
}

export const FloatingParrits: React.FC<Props> = (props) => {
  const { movePerson } = useContext(ProjectContext);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragType.Person,
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return; // don't do anything if a drop handler has already handled this
      }
      console.log("dropped item onto floating", item);
      switch (item.type) {
        case DragType.Person:
          let person = (item as unknown) as IPerson;
          movePerson(person);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const { setNewPersonOpen } = useContext(WorkspaceContext);

  return (
    <div ref={drop} className="floating-parrits">
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
  );
};
