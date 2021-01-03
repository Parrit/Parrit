import React, { useState } from "react";

interface Props {
  id: number;
  name: string;
  moveRole: (role: IRole, position: IPosition) => void;
  deleteRole: (role: IRole) => void;
}

export const Role: React.FC<Props> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const { name } = props;

  if (isDragging) {
    return null;
  }

  return <RoleTile name={name} />;
};

interface TileProps {
  name: string;
}

export const RoleTile: React.FC<TileProps> = (props) => {
  return <div className="role">{props.name}</div>;
};
