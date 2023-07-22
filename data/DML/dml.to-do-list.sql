-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "task" CASCADE;
TRUNCATE TABLE "list" CASCADE;

ALTER SEQUENCE list_id_seq RESTART WITH 1;
ALTER SEQUENCE task_id_seq RESTART WITH 1;

INSERT INTO "list"("name", "userId") VALUES 
('list 1', 1),
('list 2', 2);

INSERT INTO "task"("name", "listId") VALUES 
('task 1', 1),
('task 2', 2);

COMMIT;