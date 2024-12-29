'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon, LinkIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import { Project } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';

const emptyProject: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'> = {
  name: '',
  description: '',
  repository_url: '',
  live_url: '',
};

export default function ProjectsPage() {
  const { supabase, user } = useSupabase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Omit<Project, 'id' | 'created_at' | 'updated_at' | 'user_id'>>(emptyProject);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error fetching projects:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (isEditing && currentProjectId) {
        const { error } = await supabase
          .from('projects')
          .update({
            ...editingProject,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentProjectId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert({
          ...editingProject,
          user_id: user.id,
        });

        if (error) throw error;
      }

      setShowForm(false);
      setEditingProject(emptyProject);
      setIsEditing(false);
      setCurrentProjectId(null);
      await fetchProjects();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error saving project:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({
      name: project.name,
      description: project.description,
      repository_url: project.repository_url,
      live_url: project.live_url,
    });
    setCurrentProjectId(project.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleView = (project: Project) => {
    setEditingProject(project);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!user || !window.confirm('Are you sure you want to delete this project?')) return;

    try {
      setError(null);
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchProjects();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error deleting project:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => {
            setEditingProject(emptyProject);
            setIsEditing(false);
            setCurrentProjectId(null);
            setShowForm(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
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
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Links</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{project.name}</td>
                <td className="py-3 px-6 text-left">{project.description || '-'}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center space-x-4">
                    {project.repository_url && (
                      <a
                        href={project.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Repo
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 hover:underline flex items-center"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      onClick={() => handleView(project)}
                      className="w-4 mr-4 transform hover:text-blue-500 hover:scale-110"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="w-4 mr-4 transform hover:text-yellow-500 hover:scale-110"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProject(emptyProject);
          setIsEditing(false);
          setCurrentProjectId(null);
        }}
        title={isEditing ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editingProject.name}
              onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="repository_url" className="block text-sm font-medium text-gray-700">
              Repository URL
            </label>
            <input
              type="url"
              id="repository_url"
              value={editingProject.repository_url}
              onChange={(e) => setEditingProject({ ...editingProject, repository_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="live_url" className="block text-sm font-medium text-gray-700">
              Live URL
            </label>
            <input
              type="url"
              id="live_url"
              value={editingProject.live_url}
              onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-5">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingProject(emptyProject);
                setIsEditing(false);
                setCurrentProjectId(null);
              }}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setEditingProject(emptyProject);
        }}
        title="Project Details"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{editingProject.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{editingProject.description || 'No description'}</p>
          </div>

          <div className="space-y-2">
            {editingProject.repository_url && (
              <div>
                <h4 className="text-sm font-medium text-gray-700">Repository URL</h4>
                <a
                  href={editingProject.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {editingProject.repository_url}
                </a>
              </div>
            )}

            {editingProject.live_url && (
              <div>
                <h4 className="text-sm font-medium text-gray-700">Live URL</h4>
                <a
                  href={editingProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {editingProject.live_url}
                </a>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
