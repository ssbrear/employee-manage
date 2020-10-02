USE employees_db;

INSERT INTO department (department) VALUES ('sales');
INSERT INTO department (department) VALUES ('legal');
INSERT INTO department (department) VALUES ('development');
INSERT INTO department (department) VALUES ('management');

INSERT INTO roles (title, salary, department_id) VALUES ("Salesperson", 100000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 40000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 250000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 40000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ("Tech Lead", 200000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Engineer", 175000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Intern", 45000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ("CEO", 500000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Upper Management", 175000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Lower Management", 125000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Sebastian", "Brear", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sierra", "Prentice", 2, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Scott", "Brear", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Nic", "Brear", 4, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Biscuit", "Brear", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Bess", "Prentice", 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Katie", "Jean", 7, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Grammy", "Palmer", 8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Bloo", "Prentice", 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Sheila", "Brear", 10);