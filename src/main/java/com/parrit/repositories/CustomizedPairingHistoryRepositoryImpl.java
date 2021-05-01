package com.parrit.repositories;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    public List<PairingArrangement> findByProjectAndPairingTimeAfterOrderByPairingTimeDesc(
            Project project,
            Timestamp timestamp
    ) {
        Map<PairingArrangementDao, Map<Long, PairingHistoryDao>> pairingHistoriesToPersonIds =
                getPairingHistoriesToPersonIds(project, timestamp);
        Map<Long, Person> peopleInHistory = getPeople(getPersonIdsInHistory(pairingHistoriesToPersonIds));

        return pairingHistoriesToPersonIds.entrySet().stream()
                .map(entry -> PairingArrangement.builder()
                        .pairingTime(entry.getKey().getPairingTime())
                        .id(entry.getKey().getId())
                        .project(project)
                        .pairingHistories(
                                entry.getValue().entrySet().stream()
                                        .map(historyDaoEntry -> PairingHistory.builder()
                                                .id(historyDaoEntry.getKey())
                                                .pairingBoardName(historyDaoEntry.getValue().getBoardName())
                                                .people(historyDaoEntry.getValue().getPersonIds().stream().map(personId -> peopleInHistory.get(personId)).collect(toList()))
                                                .build())
                                        .collect(toSet())
                        )
                        .build())
                .sorted(byPairingTimeLatestFirst())
                .collect(toList());
    }

    private Map<PairingArrangementDao, Map<Long, PairingHistoryDao>> getPairingHistoriesToPersonIds(Project project, Timestamp timestamp) {
        return jdbcTemplate.query(
                "SELECT pa.id, pa.pairing_time AS pairingTime, ph.pairing_board_name, p.id as personId, ph.id pairingHistoryId" +
                        " FROM pairing_arrangement pa" +
                        "         JOIN pairing_history ph on pa.id = ph.pairing_arrangement_id" +
                        "         JOIN pairing_history_people php on php.pairing_history_id = ph.id" +
                        "         JOIN person p ON php.person_id = p.id" +
                        " WHERE pa.project_id = ? AND pairing_time > ?;",
                resultSet -> {
                    Map<PairingArrangementDao, Map<Long, PairingHistoryDao>> result = new HashMap<>();
                    while (resultSet.next()) {
                        long pairingArrangementId = resultSet.getLong("id");
                        Timestamp pairingTime = resultSet.getTimestamp("pairingTime");
                        String pairingBoardName = resultSet.getString("pairing_board_name");
                        long pairingHistoryId = resultSet.getLong("pairingHistoryId");
                        long personId = resultSet.getLong("personId");

                        PairingArrangementDao pairingArrangementDao = PairingArrangementDao.builder().pairingTime(pairingTime).id(pairingArrangementId).build();
                        Map<Long, PairingHistoryDao> boardToHistories = result.getOrDefault(pairingArrangementDao, new HashMap<>());

                        PairingHistoryDao pairingHistoryDao = boardToHistories.getOrDefault(
                                pairingHistoryId,
                                PairingHistoryDao.builder()
                                        .boardName(pairingBoardName)
                                        .build());
                        pairingHistoryDao.getPersonIds().add(personId);
                        boardToHistories.put(pairingHistoryId, pairingHistoryDao);
                        result.put(pairingArrangementDao, boardToHistories);
                    }
                    return result;
                },
                project.getId(),
                timestamp
        );
    }

    private Map<Long, Person> getPeople(Set<Long> personIds) {
        return personRepository.findAllById(personIds).stream()
                .collect(groupingBy(Person::getId, reducing(new Person(), (a, b) -> b)));
    }

    private Comparator<PairingArrangement> byPairingTimeLatestFirst() {
        return (a, b) -> b.getPairingTime().compareTo(a.getPairingTime());
    }

    private Set<Long> getPersonIdsInHistory(Map<PairingArrangementDao, Map<Long, PairingHistoryDao>> pairingHistoriesToPersonIds) {
        return pairingHistoriesToPersonIds.values().stream().flatMap(map -> map.values().stream().flatMap(historyDao -> historyDao.getPersonIds().stream())).collect(toSet());
    }

    @Builder
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    @With
    @Getter
    static class PairingHistoryDao {

        String boardName;
        @Builder.Default
        Set<Long> personIds = new HashSet<>();
    }

    @Value
    @Builder
    @EqualsAndHashCode
    static class PairingArrangementDao {
        long id;
        Timestamp pairingTime;
    }
}
