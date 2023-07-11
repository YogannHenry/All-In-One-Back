BEGIN;

DROP TABLE IF EXISTS "wallet", "document";

CREATE TABLE "wallet"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'mon portefeuille de document',
  "icon" text,
  "userId" int NOT NULL REFERENCES "user"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );


CREATE TABLE "document"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text,
  "information" text,
  "file" text,
  "icon" text,
  "document" text,
  "listId" int NOT NULL REFERENCES "list"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );

COMMIT;
