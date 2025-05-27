"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p className="text-xl text-center">
        The page you were looking for does not exist! Either
        it has been moved to a different URL or you made a
        typo.
        <Link
          href="/"
          className="link"
        >
          Navigate to Home page
        </Link>
      </p>
    </div>
  );
}
