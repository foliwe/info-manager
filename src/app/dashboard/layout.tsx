'use client';

import Layout from '@/components/Layout';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  FolderIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Emails', href: '/dashboard/email', icon: EnvelopeIcon },
  { name: 'Websites', href: '/dashboard/website', icon: GlobeAltIcon },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderIcon },
  { name: 'Tools', href: '/dashboard/tools', icon: WrenchScrewdriverIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout navigation={navigation}>{children}</Layout>;
}
