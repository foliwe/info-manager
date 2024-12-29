'use client';

import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon, 
  GlobeAltIcon, 
  FolderIcon, 
  ArrowRightOnRectangleIcon,
  HomeIcon 
} from '@heroicons/react/24/outline';
import { useSupabase } from '@/providers/supabase-provider';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
  icon: any;
}

interface LayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
}

const Layout: FC<LayoutProps> = ({ children, navigation }) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const pathname = usePathname();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg flex flex-col">
          <div className="flex h-16 items-center justify-center">
            <h1 className="text-xl font-bold text-gray-800">Info Manager</h1>
          </div>
          <nav className="mt-5 px-2 flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md mb-2
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon 
                    className={`mr-3 h-6 w-6 
                      ${isActive ? 'text-indigo-600' : ''}
                    `} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          {/* Sign out button at the bottom */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-900"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6" />
              Sign out
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
