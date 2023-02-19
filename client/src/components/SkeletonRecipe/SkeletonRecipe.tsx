import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={250}
    viewBox="0 0 320 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="9" y="5" rx="25" ry="25" width="300" height="250" />
  </ContentLoader>
);

export default Skeleton;
