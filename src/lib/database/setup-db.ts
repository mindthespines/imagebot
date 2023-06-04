import { Pool } from "pg";

const setupSql = `DROP TABLE IF EXISTS image_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS images;

CREATE TABLE images(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url TEXT NOT NULL,
    alt_text TEXT,
    post_text TEXT
);

CREATE TABLE tags(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag TEXT NOT NULL
);

CREATE TABLE image_tags(
    image_id BIGINT REFERENCES images(id),
    tag_id BIGINT REFERENCES tags(id)
);

INSERT INTO images
  (id, url, alt_text, post_text) OVERRIDING SYSTEM VALUE VALUES
  (1, 'testurl.com', 'this is the alt text', 'this is the post text'),
  (2, 'another.url', 'more alt text', 'more post text');
  
INSERT INTO tags
  (id, tag) OVERRIDING SYSTEM VALUE VALUES
  (1, 'cool'),
  (2, 'uncool'),
  (3, 'interesting'),
  (4, 'green');
  
INSERT INTO image_tags
  (image_id, tag_id) VALUES
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 4);`;

async function setup(pool: Pool) {
  try {
    await pool.query(setupSql);
  } catch (error) {
    console.error(error);
  }
}

export default setup;
