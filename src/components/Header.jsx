import React from 'react';
import { ArrowsCounterClockwise } from 'phosphor-react';

export default function Header({ setGlobalModalOpen }) {
  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 p-4 bg-white sticky top-0 z-50">
      <h1 className="text-lg font-semibold">CNAPP Dashboard</h1>
      <div className="flex flex-wrap items-center gap-2">
        <button className="border px-3 py-1 rounded text-sm" aria-label="Refresh">
          <ArrowsCounterClockwise size={32} />
        </button>
        <button className="border px-3 py-1 rounded text-sm" aria-label="More options">
          ⋮
        </button>
        <button
          className="border px-3 py-1 rounded text-sm bg-[#0A1B53] text-white"
          onClick={() => setGlobalModalOpen(true)}
        >
          + Add Widget
        </button>
        <select className="text-sm border px-2 py-1 rounded" aria-label="Time range">
          <option>Last 2 days</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
    </header>
  );
}