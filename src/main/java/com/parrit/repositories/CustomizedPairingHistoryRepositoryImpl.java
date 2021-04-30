package com.parrit.repositories;

import com.parrit.entities.PairingArrangement;
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

import static java.util.stream.Collectors.*;

@Repository
public class CustomizedPairingHistoryRepositoryImpl implements CustomizedPairingHistoryRepository {

    private final JdbcTemplate jdbcTemplate;
    private final PersonRepository personRepository;

    @Autowired
    public CustomizedPairingHistoryRepositoryImpl(
            JdbcTemplate jdbcTemplate,
            PersonRepository personRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.personRepository = personRepository;
    }

    @Override
    public List<PairingArrangement> findByProjectAndTimestampAfterOrderByTimestampDesc(
            Project project,
            Timestamp timestamp
    ) {
        Map<PairingHistory, Set<Long>> pairingHistoriesToPersonIds = getPairingHistoriesToPersonIds(project, timestamp);
        Map<Long, Person> peopleInHistory = getPeople(getPersonIdsInHistory(pairingHistoriesToPersonIds));

        return pairingHistoriesToPersonIds.entrySet().stream()
                .map(entry -> entry.getKey().withPeople(getPersonsForHistory(peopleInHistory, entry.getValue())))
                .collect(groupingBy(PairingHistory::getTimestamp))
                .entrySet().stream().map(entry -> PairingArrangement.builder()
                        .pairingTime(entry.getKey())
                        .project(project)
                        .pairingHistories(new HashSet<>(entry.getValue()))
                        .build())
                .sorted((a, b) -> b.getPairingTime().compareTo(a.getPairingTime()))
                .collect(toList());
    }

    private List<Person> getPersonsForHistory(Map<Long, Person> peopleInHistory, Set<Long> personIds) {
        return personIds.stream().map(peopleInHistory::get).collect(toList());
    }

    private Set<Long> getPersonIdsInHistory(Map<PairingHistory, Set<Long>> pairingHistoriesToPersonIds) {
        return pairingHistoriesToPersonIds.values().stream().flatMap(Collection::stream).collect(toSet());
    }

    private Map<PairingHistory, Set<Long>> getPairingHistoriesToPersonIds(Project project, Timestamp timestamp) {
        return jdbcTemplate.query(
                "SELECT id, pairing_board_name, timestamp, array_agg(person_id) as persons " +
                        "FROM pairing_history ph JOIN pairing_history_people php ON php.pairing_history_id = ph.id " +
                        "WHERE project_id = ? AND timestamp > ? " +
                        "GROUP BY id;",
                resultSet -> {
                    return extractPairingHistoryToPersonIds(project, resultSet);
                },
                project.getId(),
                timestamp
        );
    }

    private Map<PairingHistory, Set<Long>> extractPairingHistoryToPersonIds(Project project, ResultSet resultSet) throws SQLException {
        Map<PairingHistory, Set<Long>> result = new HashMap<>();
        while (resultSet.next()) {
            Long[] personIds = (Long[]) resultSet.getArray("persons").getArray();

            result.put(
                    PairingHistory.builder()
                            .id(resultSet.getLong("id"))
                            .pairingBoardName(resultSet.getString("pairing_board_name"))
                            .project(project)
                            .timestamp(resultSet.getTimestamp("timestamp"))
                            .build(),
                    new HashSet<>(Arrays.asList(personIds))
            );
        }
        return result;
    }

    private Map<Long, Person> getPeople(Set<Long> personIds) {
        return personRepository.findAllById(personIds).stream()
                .collect(groupingBy(Person::getId, reducing(new Person(), (a, b) -> b)));
    }
}
