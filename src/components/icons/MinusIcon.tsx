import type { FC, SVGProps } from "react";

const MinusIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="currentColor" d="M19 13H5v-2h14z"></path>
    </svg>
  );
};

export default MinusIcon;
