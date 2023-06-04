export interface ExpressError extends Error {
  status?: number;
}

export interface ImageRow {
  id: string;
  url: string;
  alt_text: string | null;
  post_text: string | null;
}

export interface TagRow {
  id: string;
  text: string;
}

export interface ImageWithTagsRow extends ImageRow {
  tags: string[];
}
