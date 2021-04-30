CREATE TABLE pairing_arrangement
(
    id           BIGSERIAL PRIMARY KEY,
    pairing_time timestamp without time zone NOT NULL,
    project_id   bigint                      NOT NULL
);

ALTER TABLE pairing_history
    ADD COLUMN pairing_arrangement_id bigint;

ALTER TABLE pairing_history
    ADD CONSTRAINT FK_pairing_history__pairing_arrangement
        FOREIGN KEY (pairing_arrangement_id)
            REFERENCES pairing_arrangement (id);

ALTER TABLE pairing_history DROP CONSTRAINT IF EXISTS project_id_fk;
ALTER TABLE pairing_history ALTER COLUMN project_id DROP NOT NULL;
ALTER TABLE pairing_history ALTER COLUMN timestamp DROP NOT NULL;