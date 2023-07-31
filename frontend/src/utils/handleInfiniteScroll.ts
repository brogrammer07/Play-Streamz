export const handleInfiniteScroll = (e: React.UIEvent<HTMLElement>) => {
  const bottom =
    e.currentTarget.scrollHeight -
      e.currentTarget.scrollTop -
      e.currentTarget.clientHeight <
    10;

  if (bottom) {
    return true;
  } else {
    return false;
  }
};
