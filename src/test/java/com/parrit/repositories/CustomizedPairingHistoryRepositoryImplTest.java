package com.parrit.repositories;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@Testcontainers
@AutoConfigureTestDatabase(replace = NONE)
@ContextConfiguration(initializers = {CustomizedPairingHistoryRepositoryImplTest.Initializer.class})
public class CustomizedPairingHistoryRepositoryImplTest {

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    PairingHistoryRepository pairingHistoryRepository;

    @Container
    public static PostgreSQLContainer postgreSQLContainer = new PostgreSQLContainer<>(DockerImageName.parse("postgres:12.6"))
            .withDatabaseName("test-parrit")
            .withPassword("test-parrit")
            .withUsername("test-parrit")
            .withExposedPorts(5432);

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=" + postgreSQLContainer.getJdbcUrl(),
                    "spring.datasource.username=" + postgreSQLContainer.getUsername(),
                    "spring.datasource.password=" + postgreSQLContainer.getPassword()
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }

    @Test
    void shouldReturnHistoryForProjectSearched_NotForOtherProjects() {
        List<Person> scrantonOfficePeople = setupPeople();
        String password1 = "12345678";

        Project project1 = new Project("Scranton", password1, emptyList(), scrantonOfficePeople);
        PairingHistory expectedHistory = new PairingHistory(project1, "scranton board", scrantonOfficePeople.subList(0, 3), new Timestamp(1));

        List<Person> nashuaPeople = List.of(new Person("Holly"));
        String password = "12345678";

        Project project2 = new Project("Nashua", password, emptyList(), nashuaPeople);
        PairingHistory irrelevantHistory = new PairingHistory(project2, "nashua board", nashuaPeople, new Timestamp(0));

        entityManager.persist(project1);
        scrantonOfficePeople.forEach(person -> entityManager.persist(person));
        entityManager.persist(expectedHistory);

        entityManager.persist(project2);
        nashuaPeople.forEach(person -> entityManager.persist(person));
        entityManager.persist(irrelevantHistory);
        entityManager.flush();

        List<PairingArrangement> history = pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project1, new Timestamp(0));

        PairingArrangement expectedArrangement = PairingArrangement.builder()
                .pairingHistories(Set.of(expectedHistory))
                .project(project1)
                .pairingTime(new Timestamp(1))
                .build();

        assertThat(history).usingRecursiveFieldByFieldElementComparator().containsExactly(expectedArrangement);
    }

    @Test
    void shouldReturnHistoryAfterTimestamp_NotAtOrBeforeTimestamp() {
        List<Person> scrantonOfficePeople = setupPeople();
        Project project = new Project("Scranton", "password", emptyList(), scrantonOfficePeople);
        PairingHistory expectedHistory1 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(102));
        PairingHistory expectedHistory2 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(101));
        PairingHistory unexpectedHistory = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(100));

        entityManager.persist(project);
        scrantonOfficePeople.forEach(person -> entityManager.persist(person));
        entityManager.persist(expectedHistory1);
        entityManager.persist(expectedHistory2);
        entityManager.persist(unexpectedHistory);
        entityManager.flush();

        List<PairingArrangement> history = pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project, new Timestamp(100));

        PairingArrangement expectedPairingArrangement1 = PairingArrangement.builder()
                .pairingHistories(Set.of(expectedHistory1))
                .pairingTime(new Timestamp(102))
                .project(project)
                .build();
        PairingArrangement expectedPairingArrangement2 = PairingArrangement.builder()
                .pairingHistories(Set.of(expectedHistory2))
                .pairingTime(new Timestamp(101))
                .project(project)
                .build();
        assertThat(history).usingRecursiveFieldByFieldElementComparator().containsExactlyInAnyOrder(expectedPairingArrangement1, expectedPairingArrangement2);
    }

    @Test
    void shouldReturnHistoryInOrder_withLatestRecordFirst() {
        List<Person> scrantonOfficePeople = setupPeople();
        Project project = new Project("Scranton", "password", emptyList(), scrantonOfficePeople);
        PairingHistory expectedHistory1 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(1, 2), new Timestamp(105));
        PairingHistory expectedHistory2 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(2, 3), new Timestamp(102));
        PairingHistory expectedHistory3 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(2, 4), new Timestamp(108));
        PairingHistory expectedHistory4 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(101));

        PairingArrangement pairingArrangement1 = PairingArrangement.builder()
                .project(project)
                .pairingHistories(Set.of(expectedHistory1))
                .pairingTime(new Timestamp(105))
                .build();

        PairingArrangement pairingArrangement2 = PairingArrangement.builder()
                .project(project)
                .pairingHistories(Set.of(expectedHistory2))
                .pairingTime(new Timestamp(102))
                .build();

        PairingArrangement pairingArrangement3 = PairingArrangement.builder()
                .project(project)
                .pairingHistories(Set.of(expectedHistory3))
                .pairingTime(new Timestamp(108))
                .build();

        PairingArrangement pairingArrangement4 = PairingArrangement.builder()
                .project(project)
                .pairingHistories(Set.of(expectedHistory4))
                .pairingTime(new Timestamp(101))
                .build();

        entityManager.persist(project);
        scrantonOfficePeople.forEach(person -> entityManager.persist(person));
        entityManager.persist(expectedHistory1);
        entityManager.persist(expectedHistory2);
        entityManager.persist(expectedHistory3);
        entityManager.persist(expectedHistory4);
        entityManager.flush();

        List<PairingArrangement> history = pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project, new Timestamp(100));

        assertThat(history).usingRecursiveFieldByFieldElementComparator().containsExactly(
                pairingArrangement3,
                pairingArrangement1,
                pairingArrangement2,
                pairingArrangement4
        );
    }

    @Test
    void shouldGroupHistoryByTimestamp() {
        List<Person> scrantonOfficePeople = setupPeople();
        Project project = new Project("Scranton", "password", emptyList(), scrantonOfficePeople);
        PairingHistory expectedHistory1 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(102));
        PairingHistory expectedHistory2 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(102));
        PairingHistory expectedHistory3 = new PairingHistory(project, "board1", scrantonOfficePeople.subList(0, 2), new Timestamp(100));

        entityManager.persist(project);
        scrantonOfficePeople.forEach(person -> entityManager.persist(person));
        entityManager.persist(expectedHistory1);
        entityManager.persist(expectedHistory2);
        entityManager.persist(expectedHistory3);
        entityManager.flush();

        List<PairingArrangement> history = pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project, new Timestamp(0));

        PairingArrangement expectedPairingArrangement1 = PairingArrangement.builder()
                .pairingHistories(Set.of(expectedHistory1, expectedHistory2))
                .pairingTime(new Timestamp(102))
                .project(project)
                .build();
        PairingArrangement expectedPairingArrangement2 = PairingArrangement.builder()
                .pairingHistories(Set.of(expectedHistory3))
                .pairingTime(new Timestamp(100))
                .project(project)
                .build();
        assertThat(history).usingRecursiveFieldByFieldElementComparator().containsExactlyInAnyOrder(expectedPairingArrangement1, expectedPairingArrangement2);
    }

    private List<Person> setupPeople() {
        Person michael = new Person("Michael");
        Person jim = new Person("Jim");
        Person angela = new Person("Angela");
        Person oscar = new Person("Oscar");

        return List.of(michael, jim, angela, oscar);
    }
}
