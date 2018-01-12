CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE role (
    id bigint DEFAULT nextval('role_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    pairing_board_id bigint
);

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


