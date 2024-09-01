import Skeleton from "./Skeleton";

const SkeletonContentPage = () => {
  return (
    <main>
      <div className="pt-20 px-8">
        <Skeleton classes="title width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="title width-50" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
      </div>
    </main>
  );
};

export default SkeletonContentPage;
