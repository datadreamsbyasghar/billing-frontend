import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-5 border-top" role="contentinfo">
      <div className="container text-center">
        <p className="text-muted mb-1">
          Billing & Inventory System • Built with FastAPI & React
        </p>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Ali Asghar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;