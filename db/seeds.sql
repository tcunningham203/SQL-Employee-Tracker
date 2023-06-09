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
(4, "Front Desk Staff", 30000, 3),
(5, "Public Relations", 45000, 3),
(6, "Marketing", 50000, 3),
(7, "Teacher Assistant", 20000, 4),
(8, "Cleaning Crew", 20000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'John', 'Fox', 1, 1),
  (2, 'Jane', 'Smith', 2, NULL),
  (3, 'Michael', 'Johnson', 2, NULL),
  (4, 'Emily', 'Williams', 2, NULL),
  (5, 'David', 'Brown', 2, NULL),
  (6, 'Sarah', 'Taylor', 3, NULL),
  (7, 'Christopher', 'Anderson', 3, NULL),
  (8, 'Jessica', 'Martinez', 3, NULL),
  (9, 'Hiroshi', 'Tanaka', 4, NULL),
  (10, 'Aya', 'Yamamoto', 4, NULL),
  (11, 'Satoshi', 'Nakamura', 4, NULL),
  (12, 'Akiko', 'Suzuki', 5, NULL),
  (13, 'Takashi', 'Kobayashi', 6, NULL),
  (14, 'Benjamin', 'Clark', 7, NULL),
  (15, 'Ava', 'Lewis', 7, NULL),
  (16, 'Logan', 'Lee', 7, NULL),
  (17, 'Mia', 'Wright', 7, NULL),
  (18, 'Alexander', 'Adams', 8, NULL),
  (19, 'Ella', 'Hall', 8, NULL);


