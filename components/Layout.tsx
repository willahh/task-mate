import React from "react";
import Link from "next/link";

export type ILayoutProps = {};

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <Link href="/">
        <a>
          <img className="logo" src="/logo.png" alt="logo" />
        </a>
      </Link>
      {children}
    </div>
  );
};

export { Layout };
