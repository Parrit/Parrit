INSERT INTO pairing_board (project_id, name, is_exempt)
(SELECT DISTINCT project_id, 'OUT OF OFFICE', TRUE FROM pairing_board
    WHERE project_id NOT IN
    (SELECT project_id FROM pairing_board
        WHERE is_exempt = TRUE));