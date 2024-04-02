import { IconsProps } from "@/common/types/general";

const ArrowRightIcon = (props: IconsProps) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke={"#BE8A3D"}
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M5.93994 13.2802L10.2866 8.93355C10.7999 8.42021 10.7999 7.58022 10.2866 7.06688L5.93994 2.72021'
        stroke='currentColor'
        strokeWidth='1.33333'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ArrowRightIcon;
