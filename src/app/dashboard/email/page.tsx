'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { Email } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';

const emptyEmail: Omit<Email, 'id' | 'created_at' | 'updated_at' | 'user_id'> = {
  email: '',
  password: '',
  description: '',
};

export default function EmailPage() {
  const { supabase, user } = useSupabase();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<Omit<Email, 'created_at' | 'updated_at' | 'user_id' | 'id'>>(emptyEmail);
  const [editingEmailId, setEditingEmailId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEmails();
    }
  }, [user]);

  const fetchEmails = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: true });

      if (error) throw error;
      setEmails(data || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching emails:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);

    if (!editingEmail.email) {
      setError('Email address is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      const { error } = await supabase
        .from('emails')
        .insert([{ ...editingEmail, user_id: user.id }]);

      if (error) throw error;

      setEditingEmail(emptyEmail);
      setShowForm(false);
      await fetchEmails();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error adding email:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!user || !editingEmailId) return;

    if (!editingEmail.email) {
      setError('Email address is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const { error } = await supabase
        .from('emails')
        .update({
          email: editingEmail.email,
          password: editingEmail.password,
          description: editingEmail.description,
        })
        .eq('id', editingEmailId)
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      setEditingEmailId(null);
      await fetchEmails();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error updating email:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this email?')) return;

    try {
      const { error } = await supabase
        .from('emails')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchEmails();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error deleting email:', error);
      setError(error.message);
    }
  };

  const handleEdit = (email: Email) => {
    const { id, created_at, updated_at, user_id, ...emailData } = email;
    setEditingEmail(emailData);
    setEditingEmailId(id);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Emails</h2>
        <button
          onClick={() => {
            setEditingEmail(emptyEmail);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Email
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emails.map((email) => (
              <tr key={email.id}>
                <td className="px-6 py-4 whitespace-nowrap">{email.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {email.description || <span className="text-gray-400">No description</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => {
                      setEditingEmail(email);
                      setIsViewModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(email)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
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
        title="View Email Details"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{editingEmail.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 flex items-center">
              <p className="text-sm text-gray-900">
                {showPassword ? editingEmail.password : '••••••••'}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 text-sm text-gray-900">{editingEmail.description || 'No description'}</p>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Email"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={editingEmail.email}
              onChange={(e) => setEditingEmail({ ...editingEmail, email: e.target.value })}
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
                value={editingEmail.password}
                onChange={(e) => setEditingEmail({ ...editingEmail, password: e.target.value })}
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
              value={editingEmail.description}
              onChange={(e) => setEditingEmail({ ...editingEmail, description: e.target.value })}
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

      {/* Add Email Form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Email"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="new-email"
              id="new-email"
              value={editingEmail.email}
              onChange={(e) => setEditingEmail({ ...editingEmail, email: e.target.value })}
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
                value={editingEmail.password}
                onChange={(e) => setEditingEmail({ ...editingEmail, password: e.target.value })}
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
              value={editingEmail.description}
              onChange={(e) => setEditingEmail({ ...editingEmail, description: e.target.value })}
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
              {isSubmitting ? 'Adding...' : 'Add Email'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
