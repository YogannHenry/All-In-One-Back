BEGIN;

DROP TABLE IF EXISTS "bookmark_sub_categorys", "bookmark", "sub_category", "category", "user";


CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "color" VARCHAR(50),
  "image" VARCHAR(255),
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_user_category" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "sub_category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "color" VARCHAR(50),
  "image" VARCHAR(255),
  "category_id" INT NOT NULL,
  CONSTRAINT "fk_category_sub_category" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE
);

CREATE TABLE "bookmark" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(255) NOT NULL,
  "image" VARCHAR(255),
  "title" VARCHAR(255),
  "description" TEXT,
  "comment" TEXT,
  "user_id" INT NOT NULL,
  CONSTRAINT "fk_user_bookmark" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "bookmark_sub_categorys" (
  "bookmark_id" INT NOT NULL,
  "sub_category_id" INT NOT NULL DEFAULT -1,
  CONSTRAINT "pk_bookmark_sub_categorys" PRIMARY KEY ("bookmark_id", "sub_category_id"),
  CONSTRAINT "fk_bookmark_sub_categorys_bookmark" FOREIGN KEY ("bookmark_id") REFERENCES "bookmark"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_bookmark_sub_categorys_sub_category" FOREIGN KEY ("sub_category_id") REFERENCES "sub_category"("id") ON DELETE CASCADE
);

COMMIT;
