-- SQLBook: Code
BEGIN;

INSERT INTO "list"("id", "name", "userId") VALUES 
(1, 'list 1', 1),
(1, 'list 2', 2);

INSERT INTO "task"("description", "listId") VALUES 
('task 1', 2),
('task 2', 2);

COMMIT;