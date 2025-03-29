import { IconProps } from "../../constants/interface";

const IconAccount: React.FC<IconProps> = ({
  className,
  fillColor = "currentColor",
  strokeColor = "currentColor",
}) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="path-1-inside-1_4486_14212" fill="white">
        <path d="M3.96987 7.56202C4.09551 7.56202 4.23437 7.56202 4.35339 7.58163L4.44927 7.59797V6.30385C4.44927 5.85287 4.80634 5.49666 5.26589 5.49666H5.82133L5.8048 5.40189C5.78496 5.28424 5.78496 5.14699 5.78496 5.0228C5.78496 4.89862 5.78496 4.76136 5.8048 4.64372L5.82133 4.54895H5.26589C4.28727 4.54895 3.49048 5.33653 3.49048 6.30385V7.59797L3.58636 7.58163C3.70538 7.56202 3.84424 7.56202 3.96987 7.56202Z" />
        <path d="M14.8042 5.49666C15.2473 5.49666 15.6175 5.86594 15.6175 6.30385V7.59797L15.7134 7.58163C15.8324 7.56202 15.9713 7.56202 16.0969 7.56202C16.2391 7.56202 16.3614 7.56202 16.4805 7.58163L16.5763 7.59797V6.30385C16.5763 5.33653 15.7795 4.54895 14.8009 4.54895H14.2455L14.262 4.64372C14.2818 4.76136 14.2818 4.89862 14.2818 5.0228C14.2818 5.14699 14.2818 5.28424 14.262 5.40189L14.2455 5.49666H14.8042Z" />
        <path d="M19.5783 14.6274C19.3006 13.8268 18.7287 13.1536 17.9848 12.7255C18.2327 12.3203 18.3782 11.8497 18.3782 11.3431C18.3782 9.86274 17.1615 8.66012 15.6638 8.66012C14.1661 8.66012 12.9495 9.86274 12.9495 11.3431C12.9495 11.8497 13.0949 12.3203 13.3429 12.7255C13.085 12.8725 12.8503 13.0523 12.6387 13.2582C12.7048 13.0294 12.7412 12.7876 12.7412 12.5392C12.7412 11.0588 11.5245 9.8562 10.0268 9.8562C8.52911 9.8562 7.31244 11.0588 7.31244 12.5392C7.31244 12.7941 7.35212 13.0425 7.41824 13.2745C7.20664 13.0654 6.96529 12.8823 6.70411 12.732C6.95537 12.3268 7.10085 11.8497 7.10085 11.3399C7.10085 9.85947 5.88418 8.65686 4.38648 8.65686C2.88878 8.65686 1.67211 9.8562 1.67211 11.3301C1.66219 11.8268 1.79775 12.3039 2.05563 12.7222C1.30182 13.1634 0.726547 13.8366 0.452134 14.6144C0.200865 15.3006 0.0487816 16 0.00249515 16.6993C-0.0173419 16.9804 0.0818433 17.2516 0.273601 17.4542C0.471972 17.6634 0.752996 17.781 1.04394 17.781H5.67589C5.67258 17.8268 5.66266 17.8693 5.65936 17.915C5.63952 18.1993 5.7387 18.4673 5.93046 18.6732C6.12883 18.8824 6.40986 19 6.7008 19H13.4222V18.9935C13.6834 18.9739 13.9314 18.8562 14.1099 18.6699C14.305 18.4641 14.4009 18.1961 14.381 17.915C14.381 17.8791 14.3711 17.8399 14.3711 17.8039H18.9568C19.2477 17.8039 19.5287 17.683 19.7238 17.4771C19.9156 17.2745 20.0148 17.0033 19.9982 16.7386C19.9784 16.0457 19.8329 15.3366 19.575 14.6274H19.5783ZM16.2722 12.9183C16.0771 12.964 15.8754 12.9935 15.6638 12.9935C15.4522 12.9935 15.2473 12.9608 15.0456 12.915C14.4141 12.6634 13.9512 12.049 13.9512 11.3431C13.9512 10.4085 14.7183 9.65032 15.6638 9.65032C16.6094 9.65032 17.3764 10.4085 17.3764 11.3431C17.3764 12.049 16.9103 12.6699 16.2722 12.9183ZM15.6638 14.0294C15.9746 14.0294 16.2689 13.9739 16.5466 13.8791C16.8507 13.8039 17.1417 13.6928 17.4095 13.5392C17.9914 13.8464 18.4245 14.3464 18.6328 14.9346L18.6394 14.964C18.8642 15.5686 18.9865 16.183 19.0031 16.8007C18.9931 16.8105 18.9799 16.8137 18.9634 16.8137H14.5067C14.4372 16.5261 14.3447 16.2484 14.2554 15.9869C14.0141 15.3268 13.614 14.7255 13.0883 14.2451C13.3164 13.951 13.5942 13.7124 13.9182 13.5392C14.1827 13.6863 14.4703 13.8007 14.7679 13.8758C15.0489 13.9739 15.3464 14.0294 15.6605 14.0294H15.6638ZM10.0268 10.8497C10.9724 10.8497 11.7394 11.6078 11.7394 12.5425C11.7394 13.2418 11.3063 13.8431 10.6947 14.1013C10.4798 14.1569 10.2549 14.1928 10.0268 14.1928C9.79868 14.1928 9.57386 14.1569 9.35566 14.1013C8.74401 13.8431 8.31421 13.2418 8.31421 12.5457C8.31421 11.5948 9.06802 10.8529 10.0268 10.8529V10.8497ZM7.05125 16.1797C7.27938 15.5654 7.7191 15.0556 8.29107 14.7353C8.55887 14.8823 8.83989 14.9967 9.13084 15.0686C9.41186 15.1667 9.71272 15.2222 10.0268 15.2222C10.3409 15.2222 10.6351 15.1667 10.9129 15.0719C11.2137 14.9967 11.5014 14.8856 11.7659 14.7353C12.3444 15.0588 12.7709 15.5556 12.9991 16.1765C13.2173 16.7647 13.3462 17.3725 13.3859 17.9771L13.3793 17.9967C13.3793 17.9967 13.3693 18.0065 13.3429 18.0065H6.70411C6.68757 18.0065 6.67435 18.0033 6.65782 17.9902C6.72394 17.2974 6.85288 16.7059 7.04795 16.1732L7.05125 16.1797ZM2.63421 13.5392C2.90531 13.6895 3.18965 13.8006 3.48059 13.8725C3.76822 13.9739 4.07239 14.0294 4.38979 14.0294H4.47244C4.80306 14.0163 5.11384 13.9444 5.40478 13.8301C5.65274 13.7582 5.89079 13.6634 6.1123 13.5392C6.43961 13.7157 6.72725 13.9542 6.94546 14.2386C6.433 14.7091 6.02303 15.3006 5.75854 15.9542L5.74862 15.9804C5.65605 16.2516 5.5767 16.5261 5.51058 16.7974H1.04725C1.03071 16.7974 1.01749 16.7941 1.00096 16.768C1.03733 16.1699 1.16957 15.5621 1.39109 14.9608C1.59938 14.3693 2.0391 13.8693 2.6309 13.5425L2.63421 13.5392ZM5.07416 12.8954C4.84604 12.9608 4.60469 12.9967 4.36664 12.9967C4.14843 12.9967 3.93353 12.964 3.72524 12.9118C3.51365 12.8268 3.31859 12.6961 3.15328 12.5294C2.83588 12.2091 2.66727 11.7908 2.67388 11.3464C2.67388 10.4281 3.45744 9.65359 4.38648 9.65359C5.31551 9.65359 6.09908 10.4118 6.09908 11.3464C6.09908 12.0392 5.67589 12.634 5.07416 12.8954Z" />
        <path d="M10.0268 9.04576C12.2717 9.04576 14.0967 7.24183 14.0967 5.02288C14.0967 2.80392 12.2717 1 10.0268 1C7.78192 1 5.95691 2.80392 5.95691 5.02288C5.95691 7.24183 7.78192 9.04576 10.0268 9.04576ZM10.0268 1.9902C11.7196 1.9902 13.0982 3.35294 13.0982 5.02615C13.0982 6.69935 11.7196 8.0621 10.0268 8.0621C8.33405 8.0621 6.95538 6.69935 6.95538 5.02615C6.95538 3.35294 8.33405 1.9902 10.0268 1.9902Z" />
        <path d="M10.0466 3.70249C10.2416 3.70249 10.3871 3.65021 10.5028 3.53257C10.6317 3.40514 10.6945 3.25809 10.6945 3.08164C10.6945 2.90519 10.6317 2.75815 10.4962 2.62418C10.3573 2.51635 10.2119 2.4608 10.0466 2.4608C9.85153 2.4608 9.70938 2.51308 9.59038 2.63072C9.46806 2.75162 9.39864 2.915 9.39864 3.08164C9.39864 3.24829 9.46806 3.41167 9.59699 3.53911C9.73583 3.64694 9.88129 3.70249 10.0466 3.70249Z" />
        <path d="M9.24323 4.85615L9.54409 4.88883V6.72543L9.27298 6.75811C9.1242 6.75811 9.00187 6.87903 9.00187 7.02609V7.19275C9.00187 7.33981 9.1242 7.46073 9.27298 7.46073H10.7971C10.9459 7.46073 11.0682 7.33981 11.0682 7.19275V7.02609C11.0682 6.8823 10.9525 6.75811 10.8302 6.75811L10.569 6.72543V4.3006C10.569 4.15354 10.4467 4.03262 10.2979 4.03262H10.0334L9.25314 4.15681C9.13412 4.15681 9.04486 4.23197 9.0151 4.34308H8.98534V4.59145C8.98534 4.7385 9.10767 4.85942 9.24653 4.85942L9.24323 4.85615Z" />
      </mask>
      <path
        d="M3.96987 7.56202C4.09551 7.56202 4.23437 7.56202 4.35339 7.58163L4.44927 7.59797V6.30385C4.44927 5.85287 4.80634 5.49666 5.26589 5.49666H5.82133L5.8048 5.40189C5.78496 5.28424 5.78496 5.14699 5.78496 5.0228C5.78496 4.89862 5.78496 4.76136 5.8048 4.64372L5.82133 4.54895H5.26589C4.28727 4.54895 3.49048 5.33653 3.49048 6.30385V7.59797L3.58636 7.58163C3.70538 7.56202 3.84424 7.56202 3.96987 7.56202Z"
        fill={fillColor}
      />
      <path
        d="M14.8042 5.49666C15.2473 5.49666 15.6175 5.86594 15.6175 6.30385V7.59797L15.7134 7.58163C15.8324 7.56202 15.9713 7.56202 16.0969 7.56202C16.2391 7.56202 16.3614 7.56202 16.4805 7.58163L16.5763 7.59797V6.30385C16.5763 5.33653 15.7795 4.54895 14.8009 4.54895H14.2455L14.262 4.64372C14.2818 4.76136 14.2818 4.89862 14.2818 5.0228C14.2818 5.14699 14.2818 5.28424 14.262 5.40189L14.2455 5.49666H14.8042Z"
        fill={fillColor}
      />
      <path
        d="M19.5783 14.6274C19.3006 13.8268 18.7287 13.1536 17.9848 12.7255C18.2327 12.3203 18.3782 11.8497 18.3782 11.3431C18.3782 9.86274 17.1615 8.66012 15.6638 8.66012C14.1661 8.66012 12.9495 9.86274 12.9495 11.3431C12.9495 11.8497 13.0949 12.3203 13.3429 12.7255C13.085 12.8725 12.8503 13.0523 12.6387 13.2582C12.7048 13.0294 12.7412 12.7876 12.7412 12.5392C12.7412 11.0588 11.5245 9.8562 10.0268 9.8562C8.52911 9.8562 7.31244 11.0588 7.31244 12.5392C7.31244 12.7941 7.35212 13.0425 7.41824 13.2745C7.20664 13.0654 6.96529 12.8823 6.70411 12.732C6.95537 12.3268 7.10085 11.8497 7.10085 11.3399C7.10085 9.85947 5.88418 8.65686 4.38648 8.65686C2.88878 8.65686 1.67211 9.8562 1.67211 11.3301C1.66219 11.8268 1.79775 12.3039 2.05563 12.7222C1.30182 13.1634 0.726547 13.8366 0.452134 14.6144C0.200865 15.3006 0.0487816 16 0.00249515 16.6993C-0.0173419 16.9804 0.0818433 17.2516 0.273601 17.4542C0.471972 17.6634 0.752996 17.781 1.04394 17.781H5.67589C5.67258 17.8268 5.66266 17.8693 5.65936 17.915C5.63952 18.1993 5.7387 18.4673 5.93046 18.6732C6.12883 18.8824 6.40986 19 6.7008 19H13.4222V18.9935C13.6834 18.9739 13.9314 18.8562 14.1099 18.6699C14.305 18.4641 14.4009 18.1961 14.381 17.915C14.381 17.8791 14.3711 17.8399 14.3711 17.8039H18.9568C19.2477 17.8039 19.5287 17.683 19.7238 17.4771C19.9156 17.2745 20.0148 17.0033 19.9982 16.7386C19.9784 16.0457 19.8329 15.3366 19.575 14.6274H19.5783ZM16.2722 12.9183C16.0771 12.964 15.8754 12.9935 15.6638 12.9935C15.4522 12.9935 15.2473 12.9608 15.0456 12.915C14.4141 12.6634 13.9512 12.049 13.9512 11.3431C13.9512 10.4085 14.7183 9.65032 15.6638 9.65032C16.6094 9.65032 17.3764 10.4085 17.3764 11.3431C17.3764 12.049 16.9103 12.6699 16.2722 12.9183ZM15.6638 14.0294C15.9746 14.0294 16.2689 13.9739 16.5466 13.8791C16.8507 13.8039 17.1417 13.6928 17.4095 13.5392C17.9914 13.8464 18.4245 14.3464 18.6328 14.9346L18.6394 14.964C18.8642 15.5686 18.9865 16.183 19.0031 16.8007C18.9931 16.8105 18.9799 16.8137 18.9634 16.8137H14.5067C14.4372 16.5261 14.3447 16.2484 14.2554 15.9869C14.0141 15.3268 13.614 14.7255 13.0883 14.2451C13.3164 13.951 13.5942 13.7124 13.9182 13.5392C14.1827 13.6863 14.4703 13.8007 14.7679 13.8758C15.0489 13.9739 15.3464 14.0294 15.6605 14.0294H15.6638ZM10.0268 10.8497C10.9724 10.8497 11.7394 11.6078 11.7394 12.5425C11.7394 13.2418 11.3063 13.8431 10.6947 14.1013C10.4798 14.1569 10.2549 14.1928 10.0268 14.1928C9.79868 14.1928 9.57386 14.1569 9.35566 14.1013C8.74401 13.8431 8.31421 13.2418 8.31421 12.5457C8.31421 11.5948 9.06802 10.8529 10.0268 10.8529V10.8497ZM7.05125 16.1797C7.27938 15.5654 7.7191 15.0556 8.29107 14.7353C8.55887 14.8823 8.83989 14.9967 9.13084 15.0686C9.41186 15.1667 9.71272 15.2222 10.0268 15.2222C10.3409 15.2222 10.6351 15.1667 10.9129 15.0719C11.2137 14.9967 11.5014 14.8856 11.7659 14.7353C12.3444 15.0588 12.7709 15.5556 12.9991 16.1765C13.2173 16.7647 13.3462 17.3725 13.3859 17.9771L13.3793 17.9967C13.3793 17.9967 13.3693 18.0065 13.3429 18.0065H6.70411C6.68757 18.0065 6.67435 18.0033 6.65782 17.9902C6.72394 17.2974 6.85288 16.7059 7.04795 16.1732L7.05125 16.1797ZM2.63421 13.5392C2.90531 13.6895 3.18965 13.8006 3.48059 13.8725C3.76822 13.9739 4.07239 14.0294 4.38979 14.0294H4.47244C4.80306 14.0163 5.11384 13.9444 5.40478 13.8301C5.65274 13.7582 5.89079 13.6634 6.1123 13.5392C6.43961 13.7157 6.72725 13.9542 6.94546 14.2386C6.433 14.7091 6.02303 15.3006 5.75854 15.9542L5.74862 15.9804C5.65605 16.2516 5.5767 16.5261 5.51058 16.7974H1.04725C1.03071 16.7974 1.01749 16.7941 1.00096 16.768C1.03733 16.1699 1.16957 15.5621 1.39109 14.9608C1.59938 14.3693 2.0391 13.8693 2.6309 13.5425L2.63421 13.5392ZM5.07416 12.8954C4.84604 12.9608 4.60469 12.9967 4.36664 12.9967C4.14843 12.9967 3.93353 12.964 3.72524 12.9118C3.51365 12.8268 3.31859 12.6961 3.15328 12.5294C2.83588 12.2091 2.66727 11.7908 2.67388 11.3464C2.67388 10.4281 3.45744 9.65359 4.38648 9.65359C5.31551 9.65359 6.09908 10.4118 6.09908 11.3464C6.09908 12.0392 5.67589 12.634 5.07416 12.8954Z"
        fill={fillColor}
      />
      <path
        d="M10.0268 9.04576C12.2717 9.04576 14.0967 7.24183 14.0967 5.02288C14.0967 2.80392 12.2717 1 10.0268 1C7.78192 1 5.95691 2.80392 5.95691 5.02288C5.95691 7.24183 7.78192 9.04576 10.0268 9.04576ZM10.0268 1.9902C11.7196 1.9902 13.0982 3.35294 13.0982 5.02615C13.0982 6.69935 11.7196 8.0621 10.0268 8.0621C8.33405 8.0621 6.95538 6.69935 6.95538 5.02615C6.95538 3.35294 8.33405 1.9902 10.0268 1.9902Z"
        fill={fillColor}
      />
      <path
        d="M10.0466 3.70249C10.2416 3.70249 10.3871 3.65021 10.5028 3.53257C10.6317 3.40514 10.6945 3.25809 10.6945 3.08164C10.6945 2.90519 10.6317 2.75815 10.4962 2.62418C10.3573 2.51635 10.2119 2.4608 10.0466 2.4608C9.85153 2.4608 9.70938 2.51308 9.59038 2.63072C9.46806 2.75162 9.39864 2.915 9.39864 3.08164C9.39864 3.24829 9.46806 3.41167 9.59699 3.53911C9.73583 3.64694 9.88129 3.70249 10.0466 3.70249Z"
        fill={fillColor}
      />
      <path
        d="M9.24323 4.85615L9.54409 4.88883V6.72543L9.27298 6.75811C9.1242 6.75811 9.00187 6.87903 9.00187 7.02609V7.19275C9.00187 7.33981 9.1242 7.46073 9.27298 7.46073H10.7971C10.9459 7.46073 11.0682 7.33981 11.0682 7.19275V7.02609C11.0682 6.8823 10.9525 6.75811 10.8302 6.75811L10.569 6.72543V4.3006C10.569 4.15354 10.4467 4.03262 10.2979 4.03262H10.0334L9.25314 4.15681C9.13412 4.15681 9.04486 4.23197 9.0151 4.34308H8.98534V4.59145C8.98534 4.7385 9.10767 4.85942 9.24653 4.85942L9.24323 4.85615Z"
        fill={fillColor}
      />
      <path
        d="M3.96987 7.56202C4.09551 7.56202 4.23437 7.56202 4.35339 7.58163L4.44927 7.59797V6.30385C4.44927 5.85287 4.80634 5.49666 5.26589 5.49666H5.82133L5.8048 5.40189C5.78496 5.28424 5.78496 5.14699 5.78496 5.0228C5.78496 4.89862 5.78496 4.76136 5.8048 4.64372L5.82133 4.54895H5.26589C4.28727 4.54895 3.49048 5.33653 3.49048 6.30385V7.59797L3.58636 7.58163C3.70538 7.56202 3.84424 7.56202 3.96987 7.56202Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
      <path
        d="M14.8042 5.49666C15.2473 5.49666 15.6175 5.86594 15.6175 6.30385V7.59797L15.7134 7.58163C15.8324 7.56202 15.9713 7.56202 16.0969 7.56202C16.2391 7.56202 16.3614 7.56202 16.4805 7.58163L16.5763 7.59797V6.30385C16.5763 5.33653 15.7795 4.54895 14.8009 4.54895H14.2455L14.262 4.64372C14.2818 4.76136 14.2818 4.89862 14.2818 5.0228C14.2818 5.14699 14.2818 5.28424 14.262 5.40189L14.2455 5.49666H14.8042Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
      <path
        d="M19.5783 14.6274C19.3006 13.8268 18.7287 13.1536 17.9848 12.7255C18.2327 12.3203 18.3782 11.8497 18.3782 11.3431C18.3782 9.86274 17.1615 8.66012 15.6638 8.66012C14.1661 8.66012 12.9495 9.86274 12.9495 11.3431C12.9495 11.8497 13.0949 12.3203 13.3429 12.7255C13.085 12.8725 12.8503 13.0523 12.6387 13.2582C12.7048 13.0294 12.7412 12.7876 12.7412 12.5392C12.7412 11.0588 11.5245 9.8562 10.0268 9.8562C8.52911 9.8562 7.31244 11.0588 7.31244 12.5392C7.31244 12.7941 7.35212 13.0425 7.41824 13.2745C7.20664 13.0654 6.96529 12.8823 6.70411 12.732C6.95537 12.3268 7.10085 11.8497 7.10085 11.3399C7.10085 9.85947 5.88418 8.65686 4.38648 8.65686C2.88878 8.65686 1.67211 9.8562 1.67211 11.3301C1.66219 11.8268 1.79775 12.3039 2.05563 12.7222C1.30182 13.1634 0.726547 13.8366 0.452134 14.6144C0.200865 15.3006 0.0487816 16 0.00249515 16.6993C-0.0173419 16.9804 0.0818433 17.2516 0.273601 17.4542C0.471972 17.6634 0.752996 17.781 1.04394 17.781H5.67589C5.67258 17.8268 5.66266 17.8693 5.65936 17.915C5.63952 18.1993 5.7387 18.4673 5.93046 18.6732C6.12883 18.8824 6.40986 19 6.7008 19H13.4222V18.9935C13.6834 18.9739 13.9314 18.8562 14.1099 18.6699C14.305 18.4641 14.4009 18.1961 14.381 17.915C14.381 17.8791 14.3711 17.8399 14.3711 17.8039H18.9568C19.2477 17.8039 19.5287 17.683 19.7238 17.4771C19.9156 17.2745 20.0148 17.0033 19.9982 16.7386C19.9784 16.0457 19.8329 15.3366 19.575 14.6274H19.5783ZM16.2722 12.9183C16.0771 12.964 15.8754 12.9935 15.6638 12.9935C15.4522 12.9935 15.2473 12.9608 15.0456 12.915C14.4141 12.6634 13.9512 12.049 13.9512 11.3431C13.9512 10.4085 14.7183 9.65032 15.6638 9.65032C16.6094 9.65032 17.3764 10.4085 17.3764 11.3431C17.3764 12.049 16.9103 12.6699 16.2722 12.9183ZM15.6638 14.0294C15.9746 14.0294 16.2689 13.9739 16.5466 13.8791C16.8507 13.8039 17.1417 13.6928 17.4095 13.5392C17.9914 13.8464 18.4245 14.3464 18.6328 14.9346L18.6394 14.964C18.8642 15.5686 18.9865 16.183 19.0031 16.8007C18.9931 16.8105 18.9799 16.8137 18.9634 16.8137H14.5067C14.4372 16.5261 14.3447 16.2484 14.2554 15.9869C14.0141 15.3268 13.614 14.7255 13.0883 14.2451C13.3164 13.951 13.5942 13.7124 13.9182 13.5392C14.1827 13.6863 14.4703 13.8007 14.7679 13.8758C15.0489 13.9739 15.3464 14.0294 15.6605 14.0294H15.6638ZM10.0268 10.8497C10.9724 10.8497 11.7394 11.6078 11.7394 12.5425C11.7394 13.2418 11.3063 13.8431 10.6947 14.1013C10.4798 14.1569 10.2549 14.1928 10.0268 14.1928C9.79868 14.1928 9.57386 14.1569 9.35566 14.1013C8.74401 13.8431 8.31421 13.2418 8.31421 12.5457C8.31421 11.5948 9.06802 10.8529 10.0268 10.8529V10.8497ZM7.05125 16.1797C7.27938 15.5654 7.7191 15.0556 8.29107 14.7353C8.55887 14.8823 8.83989 14.9967 9.13084 15.0686C9.41186 15.1667 9.71272 15.2222 10.0268 15.2222C10.3409 15.2222 10.6351 15.1667 10.9129 15.0719C11.2137 14.9967 11.5014 14.8856 11.7659 14.7353C12.3444 15.0588 12.7709 15.5556 12.9991 16.1765C13.2173 16.7647 13.3462 17.3725 13.3859 17.9771L13.3793 17.9967C13.3793 17.9967 13.3693 18.0065 13.3429 18.0065H6.70411C6.68757 18.0065 6.67435 18.0033 6.65782 17.9902C6.72394 17.2974 6.85288 16.7059 7.04795 16.1732L7.05125 16.1797ZM2.63421 13.5392C2.90531 13.6895 3.18965 13.8006 3.48059 13.8725C3.76822 13.9739 4.07239 14.0294 4.38979 14.0294H4.47244C4.80306 14.0163 5.11384 13.9444 5.40478 13.8301C5.65274 13.7582 5.89079 13.6634 6.1123 13.5392C6.43961 13.7157 6.72725 13.9542 6.94546 14.2386C6.433 14.7091 6.02303 15.3006 5.75854 15.9542L5.74862 15.9804C5.65605 16.2516 5.5767 16.5261 5.51058 16.7974H1.04725C1.03071 16.7974 1.01749 16.7941 1.00096 16.768C1.03733 16.1699 1.16957 15.5621 1.39109 14.9608C1.59938 14.3693 2.0391 13.8693 2.6309 13.5425L2.63421 13.5392ZM5.07416 12.8954C4.84604 12.9608 4.60469 12.9967 4.36664 12.9967C4.14843 12.9967 3.93353 12.964 3.72524 12.9118C3.51365 12.8268 3.31859 12.6961 3.15328 12.5294C2.83588 12.2091 2.66727 11.7908 2.67388 11.3464C2.67388 10.4281 3.45744 9.65359 4.38648 9.65359C5.31551 9.65359 6.09908 10.4118 6.09908 11.3464C6.09908 12.0392 5.67589 12.634 5.07416 12.8954Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
      <path
        d="M10.0268 9.04576C12.2717 9.04576 14.0967 7.24183 14.0967 5.02288C14.0967 2.80392 12.2717 1 10.0268 1C7.78192 1 5.95691 2.80392 5.95691 5.02288C5.95691 7.24183 7.78192 9.04576 10.0268 9.04576ZM10.0268 1.9902C11.7196 1.9902 13.0982 3.35294 13.0982 5.02615C13.0982 6.69935 11.7196 8.0621 10.0268 8.0621C8.33405 8.0621 6.95538 6.69935 6.95538 5.02615C6.95538 3.35294 8.33405 1.9902 10.0268 1.9902Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
      <path
        d="M10.0466 3.70249C10.2416 3.70249 10.3871 3.65021 10.5028 3.53257C10.6317 3.40514 10.6945 3.25809 10.6945 3.08164C10.6945 2.90519 10.6317 2.75815 10.4962 2.62418C10.3573 2.51635 10.2119 2.4608 10.0466 2.4608C9.85153 2.4608 9.70938 2.51308 9.59038 2.63072C9.46806 2.75162 9.39864 2.915 9.39864 3.08164C9.39864 3.24829 9.46806 3.41167 9.59699 3.53911C9.73583 3.64694 9.88129 3.70249 10.0466 3.70249Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
      <path
        d="M9.24323 4.85615L9.54409 4.88883V6.72543L9.27298 6.75811C9.1242 6.75811 9.00187 6.87903 9.00187 7.02609V7.19275C9.00187 7.33981 9.1242 7.46073 9.27298 7.46073H10.7971C10.9459 7.46073 11.0682 7.33981 11.0682 7.19275V7.02609C11.0682 6.8823 10.9525 6.75811 10.8302 6.75811L10.569 6.72543V4.3006C10.569 4.15354 10.4467 4.03262 10.2979 4.03262H10.0334L9.25314 4.15681C9.13412 4.15681 9.04486 4.23197 9.0151 4.34308H8.98534V4.59145C8.98534 4.7385 9.10767 4.85942 9.24653 4.85942L9.24323 4.85615Z"
        stroke={strokeColor}
        stroke-width="2"
        mask="url(#path-1-inside-1_4486_14212)"
      />
    </svg>
  );
};

export default IconAccount;
