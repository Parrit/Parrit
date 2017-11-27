UPDATE project SET name = SUBSTR(name, 1, 32) WHERE LENGTH(name) > 32;
UPDATE pairing_board SET name = SUBSTR(name, 1, 32) WHERE LENGTH(name) > 32;
UPDATE person SET name = SUBSTR(name, 1, 32) WHERE LENGTH(name) > 32;