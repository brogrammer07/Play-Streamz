import { FC } from "react";

interface PageNotFoundProps {}
const PageNotFound: FC<PageNotFoundProps> = ({}) => {
  return (
    <>
      <div style={{ fontSize: "1.7rem" }}>
        <h2>404</h2>
        <h5 style={{ maxWidth: "100vw" }}>Page Not Found</h5>
      </div>
    </>
  );
};

export default PageNotFound;
