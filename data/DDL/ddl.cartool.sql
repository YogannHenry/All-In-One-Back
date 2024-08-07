-- SQLBook: Code
BEGIN;

DROP TABLE IF EXISTS "car", "maintenance";

CREATE TABLE "car" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL DEFAULT 'ma voiture',
  "type" text,
  "current_km" int,
  "km_per_month" int,
  "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );

--   DROP TABLE IF EXISTS "car_user";

-- CREATE TABLE "car_user" (
--   "carId" int NOT NULL REFERENCES "car"("id") ON DELETE CASCADE,
--   "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
--   PRIMARY KEY ("carId", "userId")
-- );


CREATE TABLE "maintenance" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "last_date_verif" timestamptz,
  "last_km_verif" int,
  "validity_period" interval,
  "validity_km" int,
  "carId" int NOT NULL REFERENCES "car"("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
  );

COMMIT;