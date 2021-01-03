import React from "react";
import { Person } from "./Person";

interface Props {
  people: IPerson[];
}

export const PersonList: React.FC<Props> = (props) => {
  return (
    <div className="person-list">
      {props.people.map((person, idx) => {
        return (
          <Person key={`person-${idx}`} id={person.id} name={person.name} />
        );
      })}
    </div>
  );
};
