INSERT INTO pairing_arrangement (pairing_time, project_id)
SELECT DISTINCT timestamp, project_id FROM pairing_history;

UPDATE pairing_history ph
SET pairing_arrangement_id = pa.id
FROM pairing_arrangement pa
WHERE ph.timestamp = pa.pairing_time;