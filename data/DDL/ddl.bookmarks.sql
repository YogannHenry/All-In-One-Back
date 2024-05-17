BEGIN;

DROP TABLE IF EXISTS "bookmark_tags", "bookmark_categories", "bookmark", "categories", "tags", ;


CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "color" VARCHAR(50),
  "image" VARCHAR(255),
   "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
);


CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "color" VARCHAR(50),
   "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,

);

CREATE TABLE "bookmark" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(255) NOT NULL,
  "image" VARCHAR(255),
  "title" VARCHAR(255),
  "description" TEXT,
  "comment" TEXT,
   "userId" int NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_user_bookmark" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "bookmarks_categories" (
"bookmark_id" int NOT NULL REFERENCES "bookmark"("id") ON DELETE CASCADE,
"categories_id" int NOT NULL REFERENCES "categories"("id") ON DELETE CASCADE,
)

CREATE TABLE "bookmark_tags" (
"bookmark_id" int NOT NULL REFERENCES "bookmark"("id") ON DELETE CASCADE,
"tags_id" int NOT NULL REFERENCES "tags"("id") ON DELETE CASCADE,
)

COMMIT;
