export const getImageById = `SELECT * FROM images WHERE id = $1 LIMIT 1`;

export const getImageWithTagsById = `SELECT
    images.*,
    COALESCE(ARRAY_AGG(tags.tag), '{}') tagset,
FROM images
LEFT JOIN image_tags ON
    images.id = image_tags.image_id
INNER JOIN tags ON
    tags.id = image_tags.tag_id
WHERE images.id = $1`;

export const insertImage = `INSERT INTO images (url, alt_text, post_text)
VALUES ($1, $2, $3)
RETURNING *`;

export const findTagId = `SELECT id FROM tags WHERE tag = $1 LIMIT 1`;

export const insertTag = `INSERT INTO tags (tag) VALUES ($1) RETURNING *`;

export const insertImageTag = `INSERT INTO image_tags (image_id, tag_id) VALUES ($1, $2)`;

export const getImageTags = `SELECT tag FROM tags
INNER JOIN image_tags ON
    tags.id = image_tags.tag_id
WHERE image_tags.image_id = $1`;
