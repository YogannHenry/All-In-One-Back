-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "list", "task";

CREATE TABLE "list" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'ma todo list',
  "position" int NOT NULL DEFAULT 0,
  "userId" int NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );


CREATE TABLE "task" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'nouvelle tâche',
  "position" int NOT NULL DEFAULT 0,
  "listId" int NOT NULL REFERENCES "list"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );

COMMIT;
