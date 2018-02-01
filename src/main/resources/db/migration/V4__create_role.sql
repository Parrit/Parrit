CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE role (
    id bigint DEFAULT nextval('role_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    pairing_board_id bigint NOT NULL
);

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);

ALTER TABLE ONLY role
    ADD CONSTRAINT pairing_board_id_fk FOREIGN KEY (pairing_board_id) REFERENCES pairing_board(id);

ALTER SEQUENCE role_id_seq OWNED BY role.id;
