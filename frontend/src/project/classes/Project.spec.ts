import {addPerson, Project, removePerson, renamePairingBoard} from "./Project";

describe("Project", () => {
    describe('when remove person', () => {
        it('should not have a person after they are removed from floating', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};
            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [],
                people: [michael, jim, pam]
            });

            const updatedProject = removePerson({id: 2, name: 'do not care'}, project);

            expect(updatedProject.people).toHaveLength(2);
            expect(updatedProject.people).toContainEqual(michael);
            expect(updatedProject.people).toContainEqual(pam);
        })

        it('should not have a person after they are removed from a board', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};
            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [{people: [michael], id: 1, name: 'Scraton', roles: [], exempt: false}],
                people: [jim, pam]
            });

            const updatedProject = removePerson({id: 1, name: 'do not care'}, project);

            expect(updatedProject.people).toHaveLength(2);
            expect(updatedProject.people).toContainEqual(jim);
            expect(updatedProject.people).toContainEqual(pam);
            expect(updatedProject.pairingBoards[0].people).toHaveLength(0);
        })
    })

    describe('when add person', () => {
        it('should add person to floating', () => {
            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [],
                people: []
            });
            const jim = {id: 2, name: "Jim"};

            const updatedProject = addPerson(jim, project);

            expect(updatedProject.people).toHaveLength(1);
            expect(updatedProject.people).toContainEqual(jim);
        })

        it('should add person to board', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};

            const otherBoard = {people: [], id: 1, name: 'Scraton', roles: [], exempt: false};
            const targetBoard = {people: [michael], id: 2, name: 'Scraton', roles: [], exempt: false};
            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [otherBoard, targetBoard],
                people: [jim]
            });

            const updatedProject = addPerson(pam, project, targetBoard);

            expect(updatedProject.pairingBoards).toHaveLength(2);
            const targetBoardPeople = updatedProject.pairingBoards[1].people;
            expect(targetBoardPeople).toHaveLength(2);
            expect(targetBoardPeople).toContainEqual(michael);
            expect(targetBoardPeople).toContainEqual(pam);
        })
    })

    describe('current unpaired sticking people', () => {
        it('should return all alone people on non-exempt boards', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};
            const dwight = {id: 4, name: "dwight"};

            const board1 = {people: [michael], id: 1, name: 'Scraton', roles: [], exempt: false};
            const board2 = {people: [pam, jim], id: 2, name: 'Scraton', roles: [], exempt: false};
            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [board1, board2],
                people: [dwight]
            });

            const actual = project.unpairedStickingPeople;
            expect(actual).toHaveLength(1);
            expect(actual).toContainEqual(michael);
        })
    })

    describe('get empty pairing board', () => {
        it('should return first non-exempt board with no people on it', () => {
            const michael = {id: 1, name: "Michael"};
            const dwight = {id: 4, name: "dwight"};

            const board1 = {people: [michael], id: 1, name: 'Scraton', roles: [], exempt: false};
            const board2 = {people: [], id: 2, name: 'Scraton', roles: [], exempt: true};
            const board3 = {people: [], id: 3, name: 'Scraton', roles: [], exempt: false};
            const board4 = {people: [dwight], id: 4, name: 'Scraton', roles: [], exempt: false};

            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [board1, board2, board3, board4],
                people: []
            });

            const emptyBoard = project.emptyPairingBoard;

            expect(emptyBoard).toEqual(board3);
        })
    })

    describe('move person', () => {
        it('should move person to float', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};

            const board1 = {people: [michael], id: 1, name: 'Scraton', roles: [], exempt: false};
            const board2 = {people: [pam, jim], id: 2, name: 'Scraton', roles: [], exempt: false};

            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [board1, board2],
                people: []
            });

            const updatedProject = project.movePerson(jim);

            expect(updatedProject.people).toHaveLength(1);
            expect(updatedProject.people).toContainEqual(jim);
            expect(updatedProject.pairingBoards[1].people).toHaveLength(1);
            expect(updatedProject.pairingBoards[1].people).toContainEqual(pam);
        })

        it('should move person to target board', () => {
            const michael = {id: 1, name: "Michael"};
            const jim = {id: 2, name: "Jim"};
            const pam = {id: 3, name: "Pam"};

            const board1 = {people: [michael], id: 1, name: 'Scraton', roles: [], exempt: false};
            const board2 = {people: [pam, jim], id: 2, name: 'Scraton', roles: [], exempt: false};

            const project = new Project({
                name: 'Dunder Mifflin',
                id: 1,
                pairingBoards: [board1, board2],
                people: []
            });

            const updatedProject = project.movePerson(jim, board1);

            expect(updatedProject.pairingBoards[0].people).toHaveLength(2);
            expect(updatedProject.pairingBoards[0].people).toContainEqual(michael);
            expect(updatedProject.pairingBoards[0].people).toContainEqual(jim);
            expect(updatedProject.pairingBoards[1].people).toHaveLength(1);
            expect(updatedProject.pairingBoards[1].people).toContainEqual(pam);
        })
    })

    describe('renames pairing board', () => {
        const board1 = {people: [], id: 1, name: 'Scraton', roles: [], exempt: false};
        const board2 = {people: [], id: 2, name: 'New York', roles: [], exempt: false};

        const project = new Project({
            name: 'Dunder Mifflin',
            id: 10,
            pairingBoards: [board1, board2],
            people: []
        });

        const actual = renamePairingBoard('Utica', 1, project);

        expect(actual.pairingBoards).toHaveLength(2);
        expect(actual.pairingBoards[0].name).toEqual('Utica');
        expect(actual.pairingBoards[1].name).toEqual('New York');
    })
})