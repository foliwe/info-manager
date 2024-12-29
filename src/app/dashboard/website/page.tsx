'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { Website } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';

// Type for the form state without database-managed fields
type WebsiteFormData = Omit<Website, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

const emptyWebsite: WebsiteFormData = {
  website: '',
  url: '',
  username: '',
  password: '',
  description: '',
};

export default function WebsitePage() {
  const { supabase, user } = useSupabase();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<WebsiteFormData & { id?: number }>(emptyWebsite);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWebsites();
    }
  }, [user]);

  const fetchWebsites = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('website', { ascending: true });

      if (error) throw error;
      setWebsites(data || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching websites:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!editingWebsite.website.trim() || !editingWebsite.url.trim()) {
      setError('Website name and URL are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { error } = await supabase
        .from('websites')
        .insert([{
          ...editingWebsite,
          user_id: user.id,
        }]);

      if (error) throw error;

      setEditingWebsite(emptyWebsite);
      setShowForm(false);
      await fetchWebsites();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error adding website:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!user || !editingWebsite.id) return;

    if (!editingWebsite.website.trim() || !editingWebsite.url.trim()) {
      setError('Website name and URL are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { error } = await supabase
        .from('websites')
        .update({
          website: editingWebsite.website,
          url: editingWebsite.url,
          username: editingWebsite.username,
          password: editingWebsite.password,
          description: editingWebsite.description,
        })
        .eq('id', editingWebsite.id)
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      await fetchWebsites();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error updating website:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (website: Website) => {
    setEditingWebsite({
      id: website.id,
      website: website.website,
      url: website.url,
      username: website.username,
      password: website.password,
      description: website.description || '',
    });
    setIsEditModalOpen(true);
  };

  const handleView = (website: Website) => {
    setEditingWebsite({
      id: website.id,
      website: website.website,
      url: website.url,
      username: website.username,
      password: website.password,
      description: website.description || '',
    });
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this website?')) return;

    try {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchWebsites();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error deleting website:', error);
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Websites</h1>
        <button
          onClick={() => {
            setEditingWebsite(emptyWebsite);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Website
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Website</th>
              <th className="py-3 px-6 text-left">URL</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {websites.map((website) => (
              <tr key={website.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{website.website}</td>
                <td className="py-3 px-6 text-left">
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {website.url}
                  </a>
                </td>
                <td className="py-3 px-6 text-left">{website.description || '-'}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleView(website)}
                      className="w-4 mr-4 transform hover:text-blue-500 hover:scale-110"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(website)}
                      className="w-4 mr-4 transform hover:text-yellow-500 hover:scale-110"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(website.id)}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Website Details"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <p className="mt-1 text-sm text-gray-900">{editingWebsite.website}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <a
              href={editingWebsite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline block"
            >
              {editingWebsite.url}
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <p className="mt-1 text-sm text-gray-900">{editingWebsite.username}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex items-center">
              <p className="text-sm text-gray-900">
                {showPassword ? editingWebsite.password : '••••••••'}
              </p>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {editingWebsite.description && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{editingWebsite.description}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Website"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website Name
            </label>
            <input
              type="text"
              name="website"
              id="website"
              value={editingWebsite.website}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, website: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              value={editingWebsite.url}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={editingWebsite.username}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={editingWebsite.password}
                onChange={(e) => setEditingWebsite({ ...editingWebsite, password: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={editingWebsite.description}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Website Form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Website"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-website" className="block text-sm font-medium text-gray-700">
              Website Name
            </label>
            <input
              type="text"
              name="new-website"
              id="new-website"
              value={editingWebsite.website}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, website: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="new-url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <input
              type="url"
              name="new-url"
              id="new-url"
              value={editingWebsite.url}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="new-username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="new-username"
              id="new-username"
              value={editingWebsite.username}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type={showPassword ? 'text' : 'password'}
                name="new-password"
                id="new-password"
                value={editingWebsite.password}
                onChange={(e) => setEditingWebsite({ ...editingWebsite, password: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="new-description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="new-description"
              id="new-description"
              rows={3}
              value={editingWebsite.description}
              onChange={(e) => setEditingWebsite({ ...editingWebsite, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Adding...' : 'Add Website'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
