import type { FC, SVGProps } from "react";

const AgilityIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={512}
      height={512}
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M134.924 42.201c-8.034.11-27.397 3.323-49.424 6.893l7.604 22.027c43.938-5.873 43.678-7.054 46.89-2.572c32.14 44.839 59.603 88.148 74.676 135.023c32.603 2.41 71.533 9.14 98.31 23.852c34.083-36.34 89.673-55.812 135.497-71.701c12.157-4.216 25.246 7.4 42.47 10.068l4.848-17.264c-4.872-6.815-27.807-16.587-37.338-16.718c-4.035-.056-15.496 3.15-18.969 4.341c-56.98 11.002-103.367 13.182-162.199 32.575c-37.228-37.914-76.205-75.414-120.932-113.803c-9.238-7.93-9.691-12.88-21.433-12.72zm83.87 179.617c-14.884 26.18-24.332 32.5-44.718 46.17c-17.912-4.68-35.784-9.45-56.758-6.986c-21.017-2.805-29.586 4.975-55.086 13.9c-7.727-2.6-16.961.997-22.898 3.528c-9.757 4.976-21.342 12.282-18.766 24.588c3.949 12.712 20.223 8.898 27.655 5.703c6.245-2.98 12.055-8.777 16.357-13.34c21.38.569 30.874-.128 52.988-9.912c16.743 6.801 37.917 9.505 56.895 9.972a57 57 0 0 1 3.607-2.476c10.976-6.9 24.287-9.537 36.313-4.77c12.025 4.768 19.744 15.743 22.773 28.196c1.789 7.352 2.081 15.356.856 23.539c4.75 13.328 8.36 25.571 16.906 41.912c-5.193 22.78-3.544 45.283-2.262 68.342l-22.781 8.55l-4.34 11.069h70.213l-8.137-11.903l-16.369-8.257c3.504-23.007 9.628-45.75 6.246-69.446c.55-17.704-5.289-35.407-8.748-53.111c21.304-26.239 10.374-44.741 25.3-73.287a113 113 0 0 1 7.216-11.918c-27.363-11.34-54.484-18.839-82.461-20.063zm-18.15 81.842c-4.054.12-8.442 1.56-12.992 4.42c-7.278 4.576-14.383 12.805-18.76 23.463c-4.376 10.658-5.073 21.43-3.064 29.687s6.29 13.613 12.037 15.891s12.612 1.343 19.89-3.232c7.28-4.576 14.386-12.807 18.763-23.465c4.376-10.658 5.071-21.428 3.062-29.686s-6.289-13.614-12.035-15.892c-2.155-.855-4.468-1.258-6.9-1.186z"
      ></path>
    </svg>
  );
};

export default AgilityIcon;
