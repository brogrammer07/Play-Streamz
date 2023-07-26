import { Comment } from "./Comment";

export type Video = {
  _id: string;
  link: string;
  title: string;
  description: string;
  channelId: string;
  views: string;
  likes: string;
  dislikes: string;
  tags: string[];
  thumbnail: string;
  comment: Comment[];
  searchableParams: string;
  createdAt: string;
};

export type VideoResponse = Video & { channelData: Channel };
