"use client";

import React from "react";

const CustomButton = ({
  children,
  type,
  onClick,
  classNameProperty,
}: {
  children?: React.PropsWithChildren<string>; // React.ReactNode; // string; //
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  classNameProperty?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block rounded-lg p-2 transform hover:delay-100 ${classNameProperty}`} // 그냥 ``하면 에러. {` `}안에 쓰기
    >
      {children}
    </button>
  );
};

export default CustomButton;
