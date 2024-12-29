'use client';

import { FC, ReactNode, useState, useEffect } from 'react';
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

const TABLES = [
  { name: 'emails', path: '/dashboard/email' },
  { name: 'websites', path: '/dashboard/website' },
  { name: 'my_domains', path: '/dashboard/domains' },
  { name: 'projects', path: '/dashboard/projects' },
  { name: 'tools', path: '/dashboard/tools' }
] as const;

const Layout: FC<LayoutProps> = ({ children, navigation }) => {
  const router = useRouter();
  const { supabase, user } = useSupabase();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});
  
  const fetchCount = async (tableName: string, path: string) => {
    if (!supabase || !user) return;

    try {
      const { count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setCounts(prev => ({
        ...prev,
        [path]: count || 0
      }));
    } catch (error) {
      console.error(`Error fetching count for ${tableName}:`, error);
    }
  };

  const fetchAllCounts = async () => {
    if (!supabase || !user) return;
    
    try {
      const newCounts: Record<string, number> = {};
      
      await Promise.all(
        TABLES.map(async (table) => {
          const { count } = await supabase
            .from(table.name)
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);
          newCounts[table.path] = count || 0;
        })
      );

      setCounts(newCounts);
    } catch (error) {
      console.error('Error fetching all counts:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAllCounts();

    // Set up real-time subscriptions for all tables
    const channels = TABLES.map(table => {
      const channel = supabase.channel(`${table.name}_changes_${Math.random()}`);

      channel
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: table.name,
            filter: `user_id=eq.${user?.id}`,
          },
          () => {
            console.log(`INSERT detected in ${table.name}`);
            fetchCount(table.name, table.path);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: table.name,
            filter: `user_id=eq.${user?.id}`,
          },
          () => {
            console.log(`DELETE detected in ${table.name}`);
            fetchCount(table.name, table.path);
          }
        )
        .subscribe((status) => {
          console.log(`Subscription status for ${table.name}:`, status);
        });

      return channel;
    });

    // Cleanup subscriptions
    return () => {
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, [user?.id]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen ">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg flex flex-col mt-8">
          <div className="flex h-16 items-center justify-center">
            <h1 className="text-xl font-bold text-gray-800">Info Manager</h1>
          </div>
          <nav className="mt-5 px-2 flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const count = counts[item.href];
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  {count !== undefined && count > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-600 bg-gray-100 rounded-full">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleSignOut}
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center">
                <ArrowRightOnRectangleIcon className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Sign Out
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
