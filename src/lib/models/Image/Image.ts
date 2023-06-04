import * as sql from "./queries";

import { ImageWithTagsRow, TagRow } from "../../../types";

import pool from "../../database/pool";

class Image {
  id: string;
  url: string;
  altText: string | null;
  postText: string | null;
  tags: string[];

  constructor(row: ImageWithTagsRow) {
    this.id = row.id;
    this.url = row.url;
    this.altText = row.alt_text;
    this.postText = row.post_text;
    this.tags = row.tags ?? [];
  }

  static async create({
    url,
    altText,
    postText,
    tags,
  }: {
    url: string;
    altText?: string;
    postText?: string;
    tags?: string[];
  }): Promise<{ id: string }> {
    // make the image
    const { rows } = await pool.query(sql.insertImage, [
      url,
      altText ?? null,
      postText ?? null,
    ]);

    // get the tag IDs; if a tag doesn't exist yet, make it
    if (tags && tags.length > 0) {
      const tagIds = await Promise.all(
        tags.map(async (tag) => {
          let id = await Image.findTagId(tag);
          if (!id) {
            const newTag = await Image.createTag(tag);
            id = newTag.id;
          }
          return id;
        })
      );

      // for each tag, add an entry to the image_tags join table
      await Promise.all(
        tagIds.map(async (tagId) => {
          await Image.addImageTag(rows[0].id, tagId);
        })
      );
    }

    return { id: rows[0].id };
  }

  static async getById(id: string): Promise<Image> {
    const { rows } = await pool.query(sql.getImageWithTagsById, [id]);
    // need to also get the tags
    return new Image(rows[0]);
  }

  static async createTag(tagText: string): Promise<TagRow> {
    const { rows } = await pool.query(sql.insertTag, [tagText]);
    return rows[0];
  }

  static async findTagId(tagText: string): Promise<string | null> {
    const { rows } = await pool.query(sql.findTagId, [tagText]);
    return rows.length > 0 ? rows[0].id : null;
  }

  static async addImageTag(imageId: string, tagId: string): Promise<void> {
    await pool.query(sql.insertImageTag, [imageId, tagId]);
  }

  static async getImageTags(imageId: string): Promise<string[]> {
    const { rows } = await pool.query(sql.getImageTags, [imageId]);
    return rows.map((row) => row.tag);
  }
}

export default Image;
