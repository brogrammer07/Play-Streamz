import { Video } from "./Video";

export type Channel = {
  _id: string;
  userId: string;
  channelName: string;
  channelProfile: string | null;
  follower: {}[];
  following: {}[];
  video: Video[];
  password: string;
  profileUrl: string;
  isGoogle: boolean;
  followerCount: number;
  followingCount: number;
  videoCount: number;
};
