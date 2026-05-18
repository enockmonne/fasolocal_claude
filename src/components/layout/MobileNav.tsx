'use client';

import Link from 'next/link';
import { mainNav } from '@/config/navigation';
import SearchBar from '@/components/common/SearchBar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-green-800">
            Faso<span className="text-amber-500">Local</span>
          </span>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <SearchBar />
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1">
          {mainNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="block px-3 py-2 text-sm text-gray-500 hover:bg-green-50 hover:text-green-700 rounded-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Account links */}
        <div className="p-4 border-t space-y-1">
          <Link
            href="/account"
            onClick={onClose}
            className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg"
          >
            Mon Compte
          </Link>
          <Link
            href="/account/orders"
            onClick={onClose}
            className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg"
          >
            Mes Commandes
          </Link>
        </div>
      </div>
    </div>
  );
}
