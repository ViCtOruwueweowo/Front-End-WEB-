import React from "react";

interface HeaderBoxProps {
  title?: string;
  children?: React.ReactNode;
}

const HeaderBox: React.FC<HeaderBoxProps> = ({ title, children }) => {
  return (
<header className="text-white text-center w-100 m-0" style={{ backgroundColor: "#0857a1" }}>
      {title && <h1 className="m-0">{title}</h1>}
      {children}
    </header>
  );
};

export default HeaderBox;
