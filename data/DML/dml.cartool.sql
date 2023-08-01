-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "maintenance" CASCADE;
TRUNCATE TABLE "car" CASCADE;

ALTER SEQUENCE maintenance_id_seq RESTART WITH 1;
ALTER SEQUENCE car_id_seq RESTART WITH 1;

INSERT INTO "car"("name", "type", "current_km", "km_per_month", "userId") VALUES 
('Le cams', 'fourgon', '126000', '1000', 1),
('voiture 1', 'voiture', '200000', '5000', 1);
  
INSERT INTO "maintenance"("name","last_date_verif","last_km_verif","validity_period","validity_km", "carId") VALUES 
('pneu', 'now()', '100000', '6 months', '1000', 1),
('vidange', 'now()', '100000', '1 year', '300', 1);

COMMIT;