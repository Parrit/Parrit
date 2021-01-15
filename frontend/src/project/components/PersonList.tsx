import React from "react";
import { IPerson } from "../interfaces/IPerson";
import { Person } from "./Person";

interface Props {
  people: IPerson[];
}

export const PersonList: React.FC<Props> = (props) => {
  return (
    <div className="person-list">
      {props.people.map((person, idx) => {
        return <Person key={`person-${idx}`} person={person} />;
      })}
    </div>
  );
};
