import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 bg-opacity-90 text-white py-2 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">PMSSS</h2>
          <p className="text-sm">Prime Minister&apos;s Special Scholarship Scheme for JK Students</p>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} PMSSS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;