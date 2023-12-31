-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "wallet", "document";

CREATE TABLE "wallet"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'mon portefeuille de document',
  "icon" text,
  "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );


CREATE TABLE "document"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text,
  "information" text,
  "file" text,
  "type" text,
  "icon" text,
  "date" timestamptz NOT NULL DEFAULT now(),
  "walletId" int NOT NULL REFERENCES "wallet"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );

COMMIT;
