import { useEffect, useState } from "react";
import Button from "../../components/button";
import { Avatar } from "@mui/material";
import Input from "../../components/input";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
type CommentSectionProps = {
  comments: {
    by: {
      profile: string;
      name: string;
    };
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
    postedAt: string;
    comment: string;
  }[];
};

type CommentProps = {
  by: {
    profile: string;
    name: string;
  };
  postedAt: string;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  comment: string;
};

const Comment: React.FC<CommentProps> = ({
  by,
  disliked,
  dislikes,
  liked,
  likes,
  postedAt,
  comment,
}) => {
  return (
    <div className="flex  space-x-[20px]">
      <Avatar
        src="/assets/sample_profile_1.png"
        sx={{ width: "52px", height: "52px" }}
      />
      <div className="flex flex-col space-y-[3px] w-full">
        <div className="flex items-center justify-between">
          <h4>{by.name}</h4>
          <p className="p3-r">{postedAt}</p>
        </div>
        <p className="p3-r">{comment}</p>
        <div className="flex items-center">
          <Button
            icon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            title={likes}
            type="normal"
          />
          <Button
            icon={disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
            title={dislikes}
            type="normal"
          />
        </div>
      </div>
    </div>
  );
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const [comment, setComment] = useState<string>("");
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  useEffect(() => {
    if (comment != "") setButtonVisible(true);
  }, [comment]);
  return (
    <div className="bg-black-800 rounded-lg p-[20px] text-neutral-300 flex flex-col space-y-[10px]">
      <p className="p3-r">{comments.length ? comments.length : 0} comments</p>
      <div className="flex flex-col space-y-[35px]">
        <div className="flex  space-x-[20px]">
          <Avatar
            src="/assets/sample_profile_1.png"
            sx={{ width: "52px", height: "52px" }}
          />
          <div className="flex flex-col space-y-[10px] w-full">
            <Input
              placeholder="Add a comment..."
              setValue={setComment}
              value={comment}
              type="text"
              boxType="secondary"
              title="Comment"
            />
            {buttonVisible && (
              <div className="self-end flex items-center space-x-[5px]">
                <div
                  onClick={() => {
                    setButtonVisible(false);
                    setComment("");
                  }}
                  className=""
                >
                  <Button title="Cancel" type="outlined" />
                </div>
                <div
                  onClick={() => {
                    setButtonVisible(false);
                    setComment("");
                  }}
                  className=""
                >
                  <Button title="Comment" type="solid" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-[10px]">
          {comments.map((comment, idx) => (
            <Comment
              key={idx}
              by={comment.by}
              likes={comment.likes}
              dislikes={comment.dislikes}
              liked={comment.liked}
              disliked={comment.disliked}
              postedAt={comment.postedAt}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
