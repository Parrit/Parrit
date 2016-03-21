ALTER TABLE workspace RENAME TO project;

ALTER TABLE space RENAME CONSTRAINT fk_workspace_id TO fk_project_id;
ALTER TABLE space RENAME COLUMN workspace_id TO project_id;
ALTER TABLE space RENAME TO pairing_board;

ALTER TABLE person RENAME CONSTRAINT fk_workspace_id TO fk_project_id;
ALTER TABLE person RENAME COLUMN workspace_id TO project_id;
ALTER TABLE person RENAME CONSTRAINT fk_space_id TO fk_pairing_board_id;
ALTER TABLE person RENAME COLUMN space_id TO pairing_board_id;

ALTER TABLE pairing_history RENAME CONSTRAINT fk_workspace_id TO fk_project_id;
ALTER TABLE pairing_history RENAME COLUMN workspace_id TO project_id;
