'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { Tool, Category } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';

// Type for the form state without database-managed fields
type ToolFormData = Omit<Tool, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

const emptyTool: ToolFormData = {
  name: '',
  description: '',
  url: '',
  login_details: '',
  password: '',
  category_id: undefined,
  category: undefined,
};

export default function ToolsPage() {
  const { supabase, user } = useSupabase();
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<ToolFormData & { id?: number }>(emptyTool);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTools();
      fetchCategories();
    }
  }, [user]);

  const fetchTools = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // First fetch tools
      const { data: toolsData, error: toolsError } = await supabase
        .from('tools')
        .select(`
          *,
          category:categories (*)
        `)
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (toolsError) throw toolsError;
      setTools(toolsData || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching tools:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching categories:', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !user.id) {
      setError('You must be logged in to add a tool');
      return;
    }

    if (!editingTool.name.trim()) {
      setError('Tool name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Remove the category field before insertion
      const { category, ...toolData } = editingTool;

      console.log('Current user ID:', user.id);
      console.log('Tool data:', toolData);

      const { error } = await supabase
        .from('tools')
        .insert([{
          ...toolData,
          user_id: user.id,
        }]);

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }

      setEditingTool(emptyTool);
      setShowForm(false);
      await fetchTools();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error adding tool:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!user || !editingTool.id) {
      setError('You must be logged in to edit a tool');
      return;
    }

    if (!editingTool.name.trim()) {
      setError('Tool name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { error } = await supabase
        .from('tools')
        .update({
          name: editingTool.name,
          description: editingTool.description,
          url: editingTool.url,
          login_details: editingTool.login_details,
          password: editingTool.password,
          category_id: editingTool.category_id,
        })
        .eq('id', editingTool.id)
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      await fetchTools();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error updating tool:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool({
      id: tool.id,
      name: tool.name,
      description: tool.description || '',
      url: tool.url || '',
      login_details: tool.login_details || '',
      password: tool.password || '',
      category_id: tool.category_id,
      category: tool.category,
    });
    setIsEditModalOpen(true);
  };

  const handleView = (tool: Tool) => {
    setEditingTool({
      id: tool.id,
      name: tool.name,
      description: tool.description || '',
      url: tool.url || '',
      login_details: tool.login_details || '',
      password: tool.password || '',
      category_id: tool.category_id,
      category: tool.category,
    });
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user) {
      setError('You must be logged in to delete a tool');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchTools();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error deleting tool:', error);
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
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

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Tools</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your tools and their details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setEditingTool(emptyTool);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Tool
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tools.map((tool) => (
              <tr key={tool.id}>
                <td className="px-6 py-4 whitespace-nowrap">{tool.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tool.category?.name || 'Uncategorized'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tool.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tool.url ? (
                    <a 
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {tool.url}
                    </a>
                  ) : (
                    <span className="text-gray-400">No URL</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleView(tool)}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    title="View Tool"
                  >
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleEdit(tool)}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PencilIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => handleDelete(tool.id)}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Tool"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={editingTool.name}
              onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              value={editingTool.category_id || ''}
              onChange={(e) => setEditingTool({ ...editingTool, category_id: e.target.value ? Number(e.target.value) : undefined })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={editingTool.description || ''}
              onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              id="url"
              value={editingTool.url || ''}
              onChange={(e) => setEditingTool({ ...editingTool, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://"
            />
          </div>
          <div>
            <label htmlFor="login_details" className="block text-sm font-medium text-gray-700">Login Details</label>
            <input
              type="text"
              id="login_details"
              value={editingTool.login_details || ''}
              onChange={(e) => setEditingTool({ ...editingTool, login_details: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={editingTool.password || ''}
              onChange={(e) => setEditingTool({ ...editingTool, password: e.target.value })}
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
              {isSubmitting ? 'Adding...' : 'Add Tool'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Tool"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="edit-name"
              value={editingTool.name}
              onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="edit-category"
              value={editingTool.category_id || ''}
              onChange={(e) => setEditingTool({ ...editingTool, category_id: e.target.value ? Number(e.target.value) : undefined })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="edit-description"
              value={editingTool.description || ''}
              onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="edit-url" className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              id="edit-url"
              value={editingTool.url || ''}
              onChange={(e) => setEditingTool({ ...editingTool, url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://"
            />
          </div>
          <div>
            <label htmlFor="edit-login_details" className="block text-sm font-medium text-gray-700">Login Details</label>
            <input
              type="text"
              id="edit-login_details"
              value={editingTool.login_details || ''}
              onChange={(e) => setEditingTool({ ...editingTool, login_details: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="edit-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="edit-password"
              value={editingTool.password || ''}
              onChange={(e) => setEditingTool({ ...editingTool, password: e.target.value })}
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
              type="button"
              onClick={handleUpdate}
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setShowPassword(false); // Reset password visibility when closing modal
        }}
        title="View Tool"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{editingTool.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 text-sm text-gray-900">{editingTool.description || 'No description'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            {editingTool.url ? (
              <a 
                href={editingTool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline block"
              >
                {editingTool.url}
              </a>
            ) : (
              <p className="mt-1 text-sm text-gray-400">No URL provided</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <p className="mt-1 text-sm text-gray-900">{editingTool.category?.name || 'No category'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Login Details</label>
            <p className="mt-1 text-sm text-gray-900">{editingTool.login_details || 'No login details'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <p className="text-sm text-gray-900 pr-10">
                {editingTool.password ? (
                  showPassword ? editingTool.password : '••••••••'
                ) : (
                  <span className="text-gray-400">No password</span>
                )}
              </p>
              {editingTool.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 p-1 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
