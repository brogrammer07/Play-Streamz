import { Comment } from "./Comment";
import { Channel } from "./Channel";
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

export type VideoSearchResponse = Video & {
  channelData: Channel & { isFollowing: boolean; followersCount: number };
};
