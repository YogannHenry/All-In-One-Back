-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "user";

CREATE TABLE "user"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL
);

COMMIT;
