alter table pairing_board rename column is_exempt to exempt;
update pairing_board set exempt = false where exempt is null;
alter table pairing_board alter column exempt set not null;

update pairing_board set name = '' where name is null;
alter table pairing_board alter column name set not null;

alter table pairing_history alter column pairing_board_name set not null;
alter table pairing_history alter column timestamp set not null;
