package com.parrit.repositories;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.sql.Timestamp;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.empty;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class PairingHistoryRepositoryTest {

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    PairingHistoryRepository pairingHistoryRepository;

    @Test
    public void shouldReturnEmptyListWhenThereIsNoHistoryForProject() {
        String name = "Parrit";
        String password = "12345678";
        Person michael = new Person("Michael");
        Person jim = new Person("Jim");
        Person angela = new Person("Angela");
        Person oscar = new Person("Oscar");

        List<Person> regionalManagers = List.of(jim, michael);
        List<Person> accounts = List.of(angela, oscar);

        List<PairingBoard> boards = List.of(
                new PairingBoard("Regional Manager", false, regionalManagers, emptyList()),
                new PairingBoard("Accounting", false, accounts, emptyList())
        );

        List<Person> scrantonOfficePeople = List.of(michael, jim, angela, oscar);

        Project project = new Project(name, password, boards, scrantonOfficePeople);

        entityManager.persist(project);
        entityManager.flush();

        List<PairingHistory> history = pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project, new Timestamp(0));

        assertThat(history, empty());
    }

    @Test
    public void foo() {
        fail();
    }
}
