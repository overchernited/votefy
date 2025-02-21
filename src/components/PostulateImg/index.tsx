import { ReactNode } from "react";

interface ImgProps {
  className: string;
  children: ReactNode;
}

const PostulateImg = (props: ImgProps) => {
  return (
    <button className={`p-1 shadow-md shadow-zinc-700 ${props.className}`}>
      {props.children}
    </button>
  );
};

export default PostulateImg;
