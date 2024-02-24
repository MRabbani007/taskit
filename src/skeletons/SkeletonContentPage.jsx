import Skeleton from "./Skeleton";

const SkeletonContentPage = () => {
  return (
    <div className="">
      <Skeleton classes="title width-50" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="title width-50" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
    </div>
  );
};

export default SkeletonContentPage;
