import React, { useEffect } from "react";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { DragType, DropType } from "../interfaces/DragAndDrop";

const dragSpec = {
  beginDrag(props: any) {
    return {
      name: props.name,
    };
  },

  endDrag(
    props: {
      movePerson: (
        arg0: any,
        arg1: { floating: boolean; pairingBoardId: any }
      ) => void;
      id: any;
      deletePerson: (arg0: any) => void;
    },
    monitor: { didDrop: () => any; getDropResult: () => any }
  ) {
    if (!monitor.didDrop()) return;

    const dropTarget = monitor.getDropResult();

    switch (dropTarget.type) {
      case DropType.Floating: {
        const newPosition = { floating: true, pairingBoardId: undefined };
        props.movePerson(props.id, newPosition);
        return;
      }
      case DropType.PairingBoard: {
        const newPosition = { floating: false, pairingBoardId: dropTarget.id };
        props.movePerson(props.id, newPosition);
        return;
      }
      case DropType.TrashBin: {
        props.deletePerson(props.id);
        return;
      }
    }
  },
};

interface TileProps {
  name: string;
}

export const PersonTile: React.FC<TileProps> = (props) => {
  return <div className="person">{props.name}</div>;
};

interface Props {
  id: number;
  name: string;
  isDragging: boolean;
  movePerson: (person: IPerson, position: IPosition) => void;
  deletePerson: (role: IRole) => void;
  connectDragSource: (element: JSX.Element) => JSX.Element;
  connectDragPreview: (image: HTMLImageElement) => void;
}

const PersonRaw: React.FC<Props> = (props) => {
  useEffect(() => {
    props.connectDragPreview(getEmptyImage());
  }, []);

  const { name, isDragging, connectDragSource } = props;

  if (isDragging) return null;

  return connectDragSource(<PersonTile name={name} />);
};

const dragCollect = (
  connect: { dragSource: () => any; dragPreview: () => any },
  monitor: { isDragging: () => any }
) => {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  };
};

export const Person = DragSource(
  DragType.Person,
  dragSpec,
  dragCollect
)(PersonRaw);
