'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/providers/supabase-provider';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
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

    if (!editingProject.name || !editingProject.description) {
      setError('Project name and description are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      if (isEditing) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            name: editingProject.name,
            description: editingProject.description,
            repository_url: editingProject.repository_url,
            live_url: editingProject.live_url
          })
          .eq('id', currentProjectId);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([{ ...editingProject, user_id: user.id }]);

        if (error) throw error;
      }

      setEditingProject(emptyProject);
      setShowForm(false);
      setIsEditing(false);
      await fetchProjects();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error saving project:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (project: Project) => {
    if (!user) return;

    if (!project.name || !project.description) {
      setError('Project name and description are required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const { error } = await supabase
        .from('projects')
        .update({
          name: project.name,
          description: project.description,
          repository_url: project.repository_url,
          live_url: project.live_url,
        })
        .eq('id', project.id)
        .eq('user_id', user.id);

      if (error) throw error;
      setShowForm(false);
      await fetchProjects();
    } catch (err) {
      const error = err as PostgrestError;
      console.error('Error updating project:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
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
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(emptyProject);
            setIsEditing(false);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repository</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Live URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.repository_url && (
                    <a
                      href={project.repository_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Repository
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setIsEditing(true);
                      setIsViewModalOpen(true);
                    }}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    title="View Project"
                  >
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingProject({
                        name: project.name,
                        description: project.description,
                        repository_url: project.repository_url || '',
                        live_url: project.live_url || ''
                      });
                      setCurrentProjectId(project.id);
                      setIsEditing(true);
                      setShowForm(true);
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

      {/* Add/Edit Project Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={isEditing ? "Edit Project" : "Add Project"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="name"
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
              name="description"
              id="description"
              rows={3}
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="repository_url" className="block text-sm font-medium text-gray-700">
              Repository URL
            </label>
            <input
              type="url"
              name="repository_url"
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
              name="live_url"
              id="live_url"
              value={editingProject.live_url}
              onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
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
              {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Project Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Project"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-sm text-gray-900">{editingProject.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <p className="mt-1 text-sm text-gray-900">{editingProject.description || 'No description'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Repository URL</label>
            {editingProject.repository_url ? (
              <a 
                href={editingProject.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline block"
              >
                {editingProject.repository_url}
              </a>
            ) : (
              <p className="mt-1 text-sm text-gray-400">No repository URL provided</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Live URL</label>
            {editingProject.live_url ? (
              <a 
                href={editingProject.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline block"
              >
                {editingProject.live_url}
              </a>
            ) : (
              <p className="mt-1 text-sm text-gray-400">No live URL provided</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
