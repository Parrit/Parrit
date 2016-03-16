--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.0
-- Dumped by pg_dump version 9.5.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

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


ALTER TABLE pairing_history OWNER TO pivotal;

--
-- Name: pairing_history_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE pairing_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pairing_history_id_seq OWNER TO pivotal;

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


ALTER TABLE person OWNER TO pivotal;

--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE person_id_seq OWNER TO pivotal;

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


ALTER TABLE space OWNER TO pivotal;

--
-- Name: space_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE space_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE space_id_seq OWNER TO pivotal;

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


ALTER TABLE workspace OWNER TO pivotal;

--
-- Name: workspace_id_seq; Type: SEQUENCE; Schema: public; Owner: pivotal
--

CREATE SEQUENCE workspace_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE workspace_id_seq OWNER TO pivotal;

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
-- Name: uk_br8l0q43h1ygdohbp4htocj3h; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY workspace
    ADD CONSTRAINT uk_br8l0q43h1ygdohbp4htocj3h UNIQUE (name);


--
-- Name: workspace_pkey; Type: CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY workspace
    ADD CONSTRAINT workspace_pkey PRIMARY KEY (id);


--
-- Name: fk_9q85alydclthb37brpehuydi6; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_9q85alydclthb37brpehuydi6 FOREIGN KEY (person_two_id) REFERENCES person(id);


--
-- Name: fk_dca5hx4jttj9saol6drrp7l4s; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person
    ADD CONSTRAINT fk_dca5hx4jttj9saol6drrp7l4s FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_k3thmwe29r51w5xocu0s9l1fn; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY space
    ADD CONSTRAINT fk_k3thmwe29r51w5xocu0s9l1fn FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_lhfwbekib8r3i4gaxqkpvmou2; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_lhfwbekib8r3i4gaxqkpvmou2 FOREIGN KEY (person_one_id) REFERENCES person(id);


--
-- Name: fk_sold493vt4sxitiyx2bjpd5xc; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history
    ADD CONSTRAINT fk_sold493vt4sxitiyx2bjpd5xc FOREIGN KEY (workspace_id) REFERENCES workspace(id);


--
-- Name: fk_tehcir5vr1x2pwsn4pfcijwb8; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY person
    ADD CONSTRAINT fk_tehcir5vr1x2pwsn4pfcijwb8 FOREIGN KEY (space_id) REFERENCES space(id);


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