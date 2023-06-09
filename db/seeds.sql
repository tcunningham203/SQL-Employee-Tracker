INSERT INTO department (id, name)
VALUES 
(1, "Group Lessons"),
(2, "Private Lessons"), 
(3, "Japanese Staff"),
(4, "Part Time Staff");

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Head English Teacher", 80000, 1),
(2, "English Teacher", 60000, 1),
(3, "1 to 1 English Teacher", 55000, 2),
(4, "Japanese Staff Manager", 50000, 3),
(5, "Front Desk Staff", 30000, 3),
(6, "Public Relations", 45000, 3),
(7, "Marketing", 50000, 3),
(8, "Teacher Assistant", 20000, 4),
(9, "Cleaning Crew", 20000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'John', 'Fox', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 2, 1),
  (4, 'Emily', 'Williams', 2, 1),
  (5, 'David', 'Brown', 2, 1),
  (6, 'Sarah', 'Taylor', 3, 1),
  (7, 'Christopher', 'Anderson', 3, 1),
  (8, 'Jessica', 'Martinez', 3, 1),
  (9, 'Hiroshi', 'Tanaka', 4, NULL),
  (10, 'Aya', 'Yamamoto', 5, 9),
  (11, 'Satoshi', 'Nakamura', 5, 9),
  (12, 'Akiko', 'Suzuki', 6, 9),
  (13, 'Takashi', 'Kobayashi', 7, 9),
  (14, 'Benjamin', 'Clark', 8, 9),
  (15, 'Ava', 'Lewis', 8, 9),
  (16, 'Logan', 'Lee', 8, 9),
  (17, 'Mia', 'Wright', 8, 9),
  (18, 'Alexander', 'Adams', 9, 9),
  (19, 'Ella', 'Hall', 9, 9);


