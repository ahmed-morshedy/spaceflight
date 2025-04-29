import React from "react";

type Props = {};

const Footer = (props: Props) => {
  const date = new Date().getFullYear();
  return (
    <footer className="  ">
      <div className="flex justify-center items-center px-2 py-5 bg-gray-800 text-white">
        <p className="text-sm">
          © {date} Space Flight News. Made with ❤️ by Morshedy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
