import { Video } from "./Video";

export type Channel = {
  _id: string;
  userId: string;
  follower: {}[];
  following: {}[];
  video: Video[];
  password: string;
  profileUrl: string;
  isGoogle: boolean;
};
