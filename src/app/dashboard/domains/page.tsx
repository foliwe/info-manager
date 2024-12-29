'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { Domain } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';

// Type for the form state without database-managed fields
type DomainFormData = Omit<Domain, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

const emptyDomain: DomainFormData = {
  domain_name: '',
  registrar: '',
  date_of_purchase: '',
  expire_date: '',
  login: '',
  password: '',
  on_cloudflare: false,
};

export default function DomainsPage() {
  const { supabase, user } = useSupabase();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<DomainFormData & { id?: number }>(emptyDomain);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      fetchDomains();
    }
  }, [user]);

  const fetchDomains = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const { data: domainsData, error: domainsError } = await supabase
        .from('my_domains')
        .select('*')
        .eq('user_id', user.id)
        .order('domain_name', { ascending: true });

      if (domainsError) throw domainsError;
      setDomains(domainsData || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching domains:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !user.id) {
      setError('You must be logged in to add a domain');
      return;
    }

    if (!editingDomain.domain_name.trim()) {
      setError('Domain name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { error } = await supabase
        .from('my_domains')
        .insert([{
          ...editingDomain,
          user_id: user.id,
        }]);

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }

      setEditingDomain(emptyDomain);
      setShowForm(false);
      await fetchDomains();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error adding domain:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!user || !editingDomain.id) {
      setError('You must be logged in to edit a domain');
      return;
    }

    if (!editingDomain.domain_name.trim()) {
      setError('Domain name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { error } = await supabase
        .from('my_domains')
        .update({
          domain_name: editingDomain.domain_name,
          registrar: editingDomain.registrar,
          date_of_purchase: editingDomain.date_of_purchase,
          expire_date: editingDomain.expire_date,
          login: editingDomain.login,
          password: editingDomain.password,
          on_cloudflare: editingDomain.on_cloudflare,
        })
        .eq('id', editingDomain.id)
        .eq('user_id', user.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      await fetchDomains();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error updating domain:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (domain: Domain) => {
    setEditingDomain({
      domain_name: domain.domain_name,
      registrar: domain.registrar || '',
      date_of_purchase: domain.date_of_purchase || '',
      expire_date: domain.expire_date || '',
      login: domain.login || '',
      password: domain.password || '',
      on_cloudflare: domain.on_cloudflare || false,
      id: domain.id,
    });
    setIsEditModalOpen(true);
  };

  const handleView = (domain: Domain) => {
    setEditingDomain({
      domain_name: domain.domain_name,
      registrar: domain.registrar || '',
      date_of_purchase: domain.date_of_purchase || '',
      expire_date: domain.expire_date || '',
      login: domain.login || '',
      password: domain.password || '',
      on_cloudflare: domain.on_cloudflare || false,
      id: domain.id,
    });
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user) {
      setError('You must be logged in to delete a domain');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this domain?')) return;

    try {
      const { error } = await supabase
        .from('my_domains')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchDomains();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error deleting domain:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">My Domains</h1>
        <button
          onClick={() => {
            setEditingDomain(emptyDomain);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Domain
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
              <th className="py-3 px-6 text-left">Domain Name</th>
              <th className="py-3 px-6 text-left">Registrar</th>
              <th className="py-3 px-6 text-left">Expire Date</th>
              <th className="py-3 px-6 text-center">Cloudflare</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {domains.map((domain) => (
              <tr key={domain.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{domain.domain_name}</td>
                <td className="py-3 px-6 text-left">{domain.registrar}</td>
                <td className="py-3 px-6 text-left">{domain.expire_date}</td>
                <td className="py-3 px-6 text-center">
                  {domain.on_cloudflare ? (
                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Yes</span>
                  ) : (
                    <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">No</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleView(domain)}
                      className="w-4 mr-4 transform hover:text-blue-500 hover:scale-110"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(domain)}
                      className="w-4 mr-4 transform hover:text-yellow-500 hover:scale-110"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(domain.id)}
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

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={showForm || isEditModalOpen}
        onClose={() => {
          setShowForm(false);
          setIsEditModalOpen(false);
          setEditingDomain(emptyDomain);
          setError(null);
        }}
        title={isEditModalOpen ? 'Edit Domain' : 'Add Domain'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Domain Name</label>
            <input
              type="text"
              value={editingDomain.domain_name}
              onChange={(e) =>
                setEditingDomain({ ...editingDomain, domain_name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Registrar</label>
            <input
              type="text"
              value={editingDomain.registrar}
              onChange={(e) =>
                setEditingDomain({ ...editingDomain, registrar: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Purchase</label>
            <input
              type="date"
              value={editingDomain.date_of_purchase}
              onChange={(e) =>
                setEditingDomain({ ...editingDomain, date_of_purchase: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expire Date</label>
            <input
              type="date"
              value={editingDomain.expire_date}
              onChange={(e) =>
                setEditingDomain({ ...editingDomain, expire_date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Login</label>
            <input
              type="text"
              value={editingDomain.login}
              onChange={(e) =>
                setEditingDomain({ ...editingDomain, login: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={editingDomain.password}
                onChange={(e) =>
                  setEditingDomain({ ...editingDomain, password: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={editingDomain.on_cloudflare}
                onChange={(e) =>
                  setEditingDomain({ ...editingDomain, on_cloudflare: e.target.checked })
                }
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              On Cloudflare
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setIsEditModalOpen(false);
                setEditingDomain(emptyDomain);
                setError(null);
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={isEditModalOpen ? handleUpdate : handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Saving...' : isEditModalOpen ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setEditingDomain(emptyDomain);
        }}
        title="View Domain Details"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Domain Name</label>
            <p className="mt-1 text-sm text-gray-900">{editingDomain.domain_name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Registrar</label>
            <p className="mt-1 text-sm text-gray-900">{editingDomain.registrar || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Purchase</label>
            <p className="mt-1 text-sm text-gray-900">{editingDomain.date_of_purchase || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expire Date</label>
            <p className="mt-1 text-sm text-gray-900">{editingDomain.expire_date || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Login</label>
            <p className="mt-1 text-sm text-gray-900">{editingDomain.login || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-900">
                {showPassword ? editingDomain.password : '••••••••'}
              </p>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">On Cloudflare</label>
            <p className="mt-1 text-sm text-gray-900">
              {editingDomain.on_cloudflare ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
