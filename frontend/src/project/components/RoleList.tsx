import React from "react";

import { Role } from "./Role";

interface Props {
  roles: IRole[];
  moveRole: (role: IRole, position: IPosition) => void;
  deleteRole: (role: IRole) => void;
}

export const RoleList: React.FC<Props> = (props) => {
  return (
    <div className="role-list">
      {props.roles.map((role) => {
        return (
          <Role
            key={`role-${role.id}`}
            id={role.id}
            name={role.name}
            moveRole={props.moveRole}
            deleteRole={props.deleteRole}
          />
        );
      })}
    </div>
  );
};

export default RoleList;
