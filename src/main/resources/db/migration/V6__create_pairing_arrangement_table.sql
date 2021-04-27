CREATE TABLE pairing_arrangement (
    id SERIAL PRIMARY KEY,
    pairing_time timestamp without time zone NOT NULL,
    project_id bigint NOT NULL
)

-- add forein key column and create foreign key in pairing history