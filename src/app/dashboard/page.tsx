'use client';

import { useEffect, useState } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  GlobeAltIcon, 
  FolderIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { User } from '@/types';
import { Activity } from '@/types';
import { format, parseISO } from 'date-fns';

interface DashboardStats {
  emailCount: number;
  websiteCount: number;
  domainCount: number;
  toolCount: number;
  projectCount: number;
}

const initialStats: DashboardStats = {
  emailCount: 0,
  websiteCount: 0,
  domainCount: 0,
  toolCount: 0,
  projectCount: 0,
};

const stats_items = [
  { name: 'Email Templates', icon: EnvelopeIcon, href: '/dashboard/email', color: 'bg-blue-500', stat: 'emailCount' },
  { name: 'Websites', icon: GlobeAltIcon, href: '/dashboard/website', color: 'bg-green-500', stat: 'websiteCount' },
  { name: 'Domains', icon: BuildingOfficeIcon, href: '/dashboard/domains', color: 'bg-purple-500', stat: 'domainCount' },
  { name: 'Tools', icon: WrenchScrewdriverIcon, href: '/dashboard/tools', color: 'bg-orange-500', stat: 'toolCount' },
  
] as const;

export default function DashboardPage() {
  const { supabase, user } = useSupabase();
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Fetch stats
        const [emailData, websiteData, domainData, toolData, projectData] = await Promise.all([
          supabase.from('emails').select('id', { count: 'exact' }),
          supabase.from('websites').select('id', { count: 'exact' }),
          supabase.from('my_domains').select('id', { count: 'exact' }),
          supabase.from('tools').select('id', { count: 'exact' }),
          supabase.from('projects').select('id', { count: 'exact' }),
        ]);

        setStats({
          emailCount: emailData.count || 0,
          websiteCount: websiteData.count || 0,
          domainCount: domainData.count || 0,
          toolCount: toolData.count || 0,
          projectCount: projectData.count || 0,
        });

        // Fetch recent activities
        const [emails, websites, domains, tools, projects] = await Promise.all([
          supabase
            .from('emails')
            .select('id, email, description, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })
            .limit(3),
          supabase
            .from('websites')
            .select('id, website, description, url, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })
            .limit(3),
          supabase
            .from('my_domains')
            .select('id, domain_name, registrar, expire_date, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })
            .limit(3),
          supabase
            .from('tools')
            .select('id, name, description, url, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })
            .limit(3),
          supabase
            .from('projects')
            .select('id, name, description, repository_url, live_url, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false })
            .limit(3),
        ]);

        // Combine and sort activities
        const allActivities = [
          ...(emails.data?.map(email => ({
            type: 'email' as const,
            id: email.id,
            title: email.email,
            description: email.description,
            created_at: email.created_at,
            updated_at: email.updated_at,
            action: email.created_at === email.updated_at ? 'created' : 'updated',
            name: 'Email Template'
          })) || []),
          ...(websites.data?.map(website => ({
            type: 'website' as const,
            id: website.id,
            title: website.website,
            description: website.description,
            url: website.url,
            created_at: website.created_at,
            updated_at: website.updated_at,
            action: website.created_at === website.updated_at ? 'created' : 'updated',
            name: 'Website'
          })) || []),
          ...(domains.data?.map(domain => ({
            type: 'domain' as const,
            id: domain.id,
            title: domain.domain_name,
            description: `Registrar: ${domain.registrar}`,
            expire_date: domain.expire_date,
            created_at: domain.created_at,
            updated_at: domain.updated_at,
            action: domain.created_at === domain.updated_at ? 'created' : 'updated',
            name: 'Domain'
          })) || []),
          ...(tools.data?.map(tool => ({
            type: 'tool' as const,
            id: tool.id,
            title: tool.name,
            description: tool.description,
            url: tool.url,
            created_at: tool.created_at,
            updated_at: tool.updated_at,
            action: tool.created_at === tool.updated_at ? 'created' : 'updated',
            name: 'Tool'
          })) || []),
          ...(projects.data?.map(project => ({
            type: 'project' as const,
            id: project.id,
            title: project.name,
            description: project.description,
            repository_url: project.repository_url,
            live_url: project.live_url,
            created_at: project.created_at,
            updated_at: project.updated_at,
            action: project.created_at === project.updated_at ? 'created' : 'updated',
            name: 'Project'
          })) || [])
        ].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        setActivities(allActivities.slice(0, 3));
      } catch (err) {
        const error = err as Error;
        console.error('Error fetching dashboard data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [supabase, user]);

  // Don't render anything on the server
  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 my-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="ml-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Welcome back!
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats_items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative group bg-white overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <item.icon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                      {item.name}
                    </p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      {stats[item.stat]}
                    </p>
                  </div>
                </div>
                <ArrowTrendingUpIcon className="h-12 w-12 text-gray-200" />
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full ${item.color} opacity-75`}></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-4">
            {activities.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity</p>
            ) : (
              <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <li key={`${activity.type}-${activity.id}`} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {activity.type === 'email' && <EnvelopeIcon className="h-5 w-5 text-blue-500" />}
                          {activity.type === 'website' && <GlobeAltIcon className="h-5 w-5 text-green-500" />}
                          {activity.type === 'domain' && <BuildingOfficeIcon className="h-5 w-5 text-purple-500" />}
                          {activity.type === 'tool' && <WrenchScrewdriverIcon className="h-5 w-5 text-orange-500" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{activity.title}</p>
                          {activity.description && (
                            <p className="truncate text-sm text-gray-500">{activity.description}</p>
                          )}
                          <p className="text-sm text-gray-500">
                            Updated {format(parseISO(activity.updated_at), 'PPp')}
                          </p>
                        </div>
                        {activity.url && (
                          <div>
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              View
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
