import { useState } from "react";
import LayoutPrimary from "../../components/layouts";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import { channels } from "../../utils/data";
import ChannelAction from "../../components/channelProfileCards/ChannelAction";

type Props = {};

function Following({}: Props) {
  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[32px] overflow-y-auto pr-3">
        <div className="text-neutral-400 flex items-center space-x-2">
          <SubscriptionsOutlinedIcon />
          <h2>Following ({channels.length})</h2>
        </div>
        <div className="grid grid-cols-5 gap-[40px]">
          {channels.map((channel, idx) => (
            <ChannelAction key={idx} channel={channel} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Following;
