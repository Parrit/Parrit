package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.*;

import static java.util.Collections.nCopies;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

@Repository
public class CustomizedPairingHistoryRepositoryImpl implements CustomizedPairingHistoryRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CustomizedPairingHistoryRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<PairingHistory> findByProjectAndTimestampAfterOrderByTimestampDesc(Project project, Timestamp timestamp) {
        Map<PairingHistory, Long[]> pairingHistoriesToPersonIds = getPairingHistoriesToPersonIds(project, timestamp);
        Map<Long, Person> peopleInHistory = getRelevantPeople(pairingHistoriesToPersonIds);

        return pairingHistoriesToPersonIds.entrySet().stream()
                .map(entry -> entry.getKey()
                                .withPeople(Arrays.stream(entry.getValue()).map(id -> peopleInHistory.get(id)).collect(toList()))
                )
                .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
                .collect(toList());
    }

    private Map<PairingHistory, Long[]> getPairingHistoriesToPersonIds(Project project, Timestamp timestamp) {
        return jdbcTemplate.query(
                "SELECT id, pairing_board_name, timestamp, array_agg(person_id) as persons " +
                        "FROM pairing_history ph JOIN pairing_history_people php ON php.pairing_history_id = ph.id " +
                        "WHERE project_id = ? AND timestamp > ? " +
                        "GROUP BY id;",
                resultSet -> { return extractPairingHistoryToPersonIds(project, resultSet); },
                project.getId(),
                timestamp
        );
    }

    private Map<PairingHistory, Long[]> extractPairingHistoryToPersonIds(Project project, ResultSet resultSet) throws SQLException {
        Map<PairingHistory, Long[]> result = new HashMap<>();
        while (resultSet.next()) {
            Long[] personIds = (Long[]) resultSet.getArray("persons").getArray();
            result.put(
                    PairingHistory.builder()
                            .id(resultSet.getLong("id"))
                            .pairingBoardName(resultSet.getString("pairing_board_name"))
                            .project(project)
                            .timestamp(resultSet.getTimestamp("timestamp"))
                            .build(),
                    personIds
            );
        }
        return result;
    }

    private Map<Long, Person> getRelevantPeople(Map<PairingHistory, Long[]> pairingHistories) {
        Set<Long> personIds = pairingHistories.values().stream().flatMap(Arrays::stream).collect(toSet());
        String inClausePlaceholder = String.join(",", nCopies(personIds.size(), "?"));

        return jdbcTemplate.query(
                String.format("SELECT id, name FROM person WHERE id IN (%s)", inClausePlaceholder),
                this::extractIdToPerson,
                personIds.toArray());
    }

    private Map<Long, Person> extractIdToPerson(ResultSet resultSet) throws SQLException {
        Map<Long, Person> result = new HashMap<>();

        while (resultSet.next()) {
            long personId = resultSet.getLong("id");
            result.put(
                    personId,
                    Person.builder().id(personId).name(resultSet.getString("name")).build()
            );
        }
        return result;
    }
}
