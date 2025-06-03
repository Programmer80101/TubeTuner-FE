"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="full-screen grid place-items-center">
      <div>
        <h1>404</h1>
        <p className="text-xl text-center">
          The page you were looking for does not exist! Either
          it has been moved to a different URL or you made a
          typo.
        </p>
        <p className="text-center text-xl">
          <Link
            href="/"
            className="link"
          >
            Navigate to Home page
          </Link>
        </p>
      </div>
    </div>
  );
}
