import React, { useContext, useState } from "react";

import { Workspace } from "./Workspace";
import { Button } from "../../shared/components/Button";
import { ProjectContext } from "../ProjectContext";

export const Project: React.FC = (props) => {
  const { project, resetPairs, getRecommendedPairs, savePairing } = useContext(
    ProjectContext
  );

  return (
    <main className="project">
      <div className="sub-header">
        <h1 className="project-name">{project.name}</h1>
        <div className="project-actions">
          <Button
            className="button-blue"
            tooltip="Move All Pairs to Floating"
            name="Reset Pairs"
            shortName="Reset"
            clickFunction={resetPairs}
          />
          <Button
            className="button-blue"
            tooltip="Automatically suggest pairings based on last paired date"
            name="Recommend Pairs"
            shortName="Recommend"
            clickFunction={getRecommendedPairs}
          />
          <Button
            className="button-green"
            tooltip="Make note of parings for future recommendations"
            name="Record Pairs"
            shortName="Record"
            clickFunction={savePairing}
          />
        </div>
      </div>
      <div className="sub-header-dotted-line" />
      <Workspace />
    </main>
  );
};
