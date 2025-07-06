"use client";

const Footer = () => (
  <footer className="w-full py-6 bg-white dark:bg-neutral-950 flex justify-center items-center border-t border-neutral-200 dark:border-neutral-800 mt-auto">
    <span className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
      © {new Date().getFullYear()} SignBridge. All rights reserved.
    </span>
  </footer>
);

export default Footer; 