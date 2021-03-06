import React from "react";

import {Role} from "./Role";

interface Props {
  roles: IRole[];
}

export const RoleList: React.FC<Props> = (props) => {
  return (
    <div className="role-list">
      {props.roles.map((role) => {
        return <Role key={`role-${role.id}`} role={role} />;
      })}
    </div>
  );
};

export default RoleList;
