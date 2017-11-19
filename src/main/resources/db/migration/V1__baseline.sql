--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.5

--
-- Name: pairing_board_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pairing_board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pairing_board; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pairing_board (
    id bigint DEFAULT nextval('pairing_board_id_seq'::regclass) NOT NULL,
    exempt boolean NOT NULL,
    name character varying(255) NOT NULL,
    project_id bigint NOT NULL
);


--
-- Name: pairing_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE pairing_board_id_seq OWNED BY pairing_board.id;


--
-- Name: pairing_history_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pairing_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pairing_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pairing_history (
    id bigint DEFAULT nextval('pairing_history_id_seq'::regclass) NOT NULL,
    pairing_board_name character varying(255) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    project_id bigint NOT NULL
);


--
-- Name: pairing_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE pairing_history_id_seq OWNED BY pairing_history.id;


--
-- Name: pairing_history_people; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE pairing_history_people (
    pairing_history_id bigint NOT NULL,
    person_id bigint NOT NULL
);


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE person (
    id bigint DEFAULT nextval('person_id_seq'::regclass) NOT NULL,
    name character varying(100) NOT NULL,
    pairing_board_id bigint,
    project_id bigint
);


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE person_id_seq OWNED BY person.id;


--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: project; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE project (
    id bigint DEFAULT nextval('project_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE project_id_seq OWNED BY project.id;


--
-- Name: pairing_board pairing_board_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_board
    ADD CONSTRAINT pairing_board_pkey PRIMARY KEY (id);


--
-- Name: pairing_history pairing_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT pairing_history_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: project project_name_uk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_name_uk UNIQUE (name);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: person pairing_board_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY person
    ADD CONSTRAINT pairing_board_id_fk FOREIGN KEY (pairing_board_id) REFERENCES pairing_board(id);


--
-- Name: pairing_history_people pairing_history_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_history_people
    ADD CONSTRAINT pairing_history_fk FOREIGN KEY (pairing_history_id) REFERENCES pairing_history(id);


--
-- Name: pairing_history_people person_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_history_people
    ADD CONSTRAINT person_id_fk FOREIGN KEY (person_id) REFERENCES person(id);


--
-- Name: pairing_board project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_board
    ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES project(id);


--
-- Name: pairing_history project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES project(id);


--
-- Name: person project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY person
    ADD CONSTRAINT project_id_fk FOREIGN KEY (project_id) REFERENCES project(id);


--
-- PostgreSQL database dump complete
--

