import { useEffect, useState } from "react";
import Button from "../../components/button";

type DescriptionBoxProps = {
  postedAt: string;
  views: number;
  description: string;
  tags: string[];
};

const DescriptionBox: React.FC<DescriptionBoxProps> = ({
  description,
  postedAt,
  tags,
  views,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  return (
    <div
      className={`w-full ${
        showMore ? "" : "max-h-[175px]"
      } bg-black-800 rounded-lg p-[20px] text-neutral-300 flex flex-col space-y-[6px]`}
    >
      <div className="">
        <p className="p3-r">
          {views} views {postedAt}
        </p>
      </div>
      <div className="flex gap-x-3 flex-wrap">
        {tags.map((tag, idx) => (
          <p key={idx} className="p3-sb">
            #{tag}
          </p>
        ))}
      </div>
      <div className="overflow-hidden">
        <p className="p2-r text-ellipsis">{description}</p>
      </div>
      <div onClick={() => setShowMore(!showMore)} className="self-end">
        <Button title={showMore ? "Show less" : "Show more"} type="normal" />
      </div>
    </div>
  );
};

export default DescriptionBox;
