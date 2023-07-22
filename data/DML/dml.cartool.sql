-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "maintenance" CASCADE;
TRUNCATE TABLE "car" CASCADE;

ALTER SEQUENCE maintenance_id_seq RESTART WITH 1;
ALTER SEQUENCE car_id_seq RESTART WITH 1;

INSERT INTO "car"("name", "type", "current_km", "km_per_month", "icon", "userId") VALUES 
('Le cams', 'fourgon', '126000', '1000', 'camion', 1),
('voiture 1', 'voiture', '200000', '5000', 'voiture', 1);
  
INSERT INTO "maintenance"("name","last_date_verif","last_km_verif","validity_period","validity_km", "icon", "carId") VALUES 
('pneu', 'now()', '100000', '2023-08-01', '1000', 'pneu', 1),
('vidange', 'now()', '100000', '2023-08-01', '300', 'vidange', 1);

COMMIT;