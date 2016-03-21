ALTER TABLE pairing_history DROP CONSTRAINT fk_person_one_id;
ALTER TABLE pairing_history DROP COLUMN person_one_id;
ALTER TABLE pairing_history DROP CONSTRAINT fk_person_two_id;
ALTER TABLE pairing_history DROP COLUMN person_two_id;

ALTER TABLE pairing_history RENAME COLUMN space_name TO pairing_board_name;

--
-- Name: pairing_history_people; Type: TABLE; Schema: public; Owner: pivotal
--

CREATE TABLE pairing_history_people (
    pairing_history_id bigint NOT NULL,
    person_id bigint NOT NULL
);

--
-- Name: fk_pairing_history_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history_people
    ADD CONSTRAINT fk_pairing_history_id FOREIGN KEY (pairing_history_id) REFERENCES pairing_history(id);

--
-- Name: fk_person_id; Type: FK CONSTRAINT; Schema: public; Owner: pivotal
--

ALTER TABLE ONLY pairing_history_people
    ADD CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES person(id);

