import { IconsProps } from "@/common/types/general";

const CheckBoxIcon = (props: IconsProps) => {
  return (
    <svg
      width='16'
      height='12'
      viewBox='0 0 16 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
    >
      <path
        d='M2.77051 6.00462L6.25361 9.34908L13.2321 2.66016'
        stroke='white'
        strokeWidth='1.84617'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CheckBoxIcon;
