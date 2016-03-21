--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.0
-- Dumped by pg_dump version 9.5.0

--
-- Name: pairing_history; Type: TABLE; Schema: public; Owner: pivotal
--

CREATE TABLE pairing_history (
    id bigint NOT NULL,
    space_name character varying(255),
    "timestamp" timestamp without time zone,
    person_one_id bigint,
    person_two_id bigint,
    workspace_id bigint
);


--
-- Name: pairing_history_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE pairing_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pairing_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE pairing_history_id_seq OWNED BY pairing_history.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: pivotal
--

CREATE TABLE person (
    id bigint NOT NULL,
    name character varying(10) NOT NULL,
    workspace_id bigint,
    space_id bigint
);


--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE person_id_seq OWNED BY person.id;


--
-- Name: space; Type: TABLE; Schema: public; Owner: pivotal
--

CREATE TABLE space (
    id bigint NOT NULL,
    name character varying(255),
    workspace_id bigint
);


--
-- Name: space_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE space_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: space_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE space_id_seq OWNED BY space.id;


--
-- Name: workspace; Type: TABLE; Schema: public; Owner: pivotal
--

CREATE TABLE workspace (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


--
-- Name: workspace_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE workspace_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: workspace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pivotal
--

ALTER SEQUENCE workspace_id_seq OWNED BY workspace.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history ALTER COLUMN id SET DEFAULT nextval('pairing_history_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person ALTER COLUMN id SET DEFAULT nextval('person_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY space ALTER COLUMN id SET DEFAULT nextval('space_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY workspace ALTER COLUMN id SET DEFAULT nextval('workspace_id_seq'::regclass);


--
-- Data for Name: pairing_history; Type: TABLE DATA; Schema: public; Owner: pivotal
--

COPY pairing_history (id, space_name, "timestamp", person_one_id, person_two_id, workspace_id) FROM stdin;
\.


--
-- Name: pairing_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pivotal
--

SELECT pg_catalog.setval('pairing_history_id_seq', 1, false);


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: pivotal
--

COPY person (id, name, workspace_id, space_id) FROM stdin;
\.


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pivotal
--

SELECT pg_catalog.setval('person_id_seq', 1, false);


--
-- Data for Name: space; Type: TABLE DATA; Schema: public; Owner: pivotal
--

COPY space (id, name, workspace_id) FROM stdin;
\.


--
-- Name: space_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pivotal
--

SELECT pg_catalog.setval('space_id_seq', 1, false);


--
-- Data for Name: workspace; Type: TABLE DATA; Schema: public; Owner: pivotal
--

COPY workspace (id, name, password) FROM stdin;
\.


--
-- Name: workspace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pivotal
--

SELECT pg_catalog.setval('workspace_id_seq', 1, false);


--
-- Name: pairing_history_pkey; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT pairing_history_pkey PRIMARY KEY (id);


--
-- Name: person_pkey; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: space_pkey; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY space
    ADD CONSTRAINT space_pkey PRIMARY KEY (id);


--
-- Name: uk_workspace_name; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY workspace
    ADD CONSTRAINT uk_workspace_name UNIQUE (name);


--
-- Name: workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY workspace
    ADD CONSTRAINT workspace_pkey PRIMARY KEY (id);


--
-- Name: fk_person_two_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_person_two_id FOREIGN KEY (person_two_id) REFERENCES person(id);


--
-- Name: fk_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person
    ADD CONSTRAINT fk_workspace_id FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY space
    ADD CONSTRAINT fk_workspace_id FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_person_one_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_person_one_id FOREIGN KEY (person_one_id) REFERENCES person(id);


--
-- Name: fk_workspace_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_workspace_id FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_space_it; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person
    ADD CONSTRAINT fk_space_id FOREIGN KEY (space_id) REFERENCES space(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--