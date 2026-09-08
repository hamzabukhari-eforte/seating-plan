'use client';

export function SeatingBreadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="mb-2 flex flex-wrap items-center text-[0.8rem] font-medium">
        <li className="text-muted">Dashboard</li>
        <li className="text-crumb before:mx-2 before:text-crumb before:content-['/']">Office Seating</li>
      </ol>
    </nav>
  );
}
