'use client';

import './globals.css';
import SupabaseProvider from '@/providers/supabase-provider';
import { useSupabase } from '@/providers/supabase-provider';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50" suppressHydrationWarning>
      <head>
        <title>Info Manager</title>
        <meta name="description" content="Personal Information Manager" />
      </head>
      <body className="h-full" suppressHydrationWarning>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}

function AuthCheck({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        // Only redirect on explicit sign out
        window.location.href = '/login';
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return children;
}
