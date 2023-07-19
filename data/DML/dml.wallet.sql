-- SQLBook: Code
BEGIN;

INSERT INTO "wallet"("name", "userId") VALUES 
('wallet 1', 1),
('wallet 2', 2);

INSERT INTO "document" ("name", "walletId") VALUES
('doc1', 5),
('doc2', 5);

COMMIT;