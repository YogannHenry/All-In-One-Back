-- SQLBook: Code
BEGIN;

TRUNCATE TABLE "document" CASCADE;
TRUNCATE TABLE "wallet" CASCADE; 

ALTER SEQUENCE wallet_id_seq RESTART WITH 1;
ALTER SEQUENCE document_id_seq RESTART WITH 1;

INSERT INTO "wallet"("name", "userId") VALUES 
('wallet 1', 1),
('wallet 2', 2);

INSERT INTO "document" ("name", "walletId") VALUES
('doc1', 1),
('doc2', 1);

COMMIT;