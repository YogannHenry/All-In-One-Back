-- SQLBook: Code
BEGIN;

INSERT INTO "list"("name", "userId") VALUES 
('list 1', 1),
('list 2', 2);

INSERT INTO "task"("name", "listId") VALUES 
('task 1', 1),
('task 2', 2);

COMMIT;