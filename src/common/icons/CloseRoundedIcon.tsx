import { IconsProps } from "@/common/types/general";

const CloseRoundedIcon = (props: IconsProps) => {
  return (
    <svg
      width='19'
      height='20'
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M7.25977 12.2406L11.7406 7.75977'
        stroke='#4A5766'
        strokeWidth='1.1875'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.7406 12.2406L7.25977 7.75977'
        stroke='#4A5766'
        strokeWidth='1.1875'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.12516 17.9163H11.8752C15.8335 17.9163 17.4168 16.333 17.4168 12.3747V7.62467C17.4168 3.66634 15.8335 2.08301 11.8752 2.08301H7.12516C3.16683 2.08301 1.5835 3.66634 1.5835 7.62467V12.3747C1.5835 16.333 3.16683 17.9163 7.12516 17.9163Z'
        stroke='#4A5766'
        strokeWidth='1.1875'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CloseRoundedIcon;
