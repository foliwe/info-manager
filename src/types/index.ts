export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Tool = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  login_details?: string;
  password?: string;
  user_id: string;
  category_id?: number;
  category?: Category;
  created_at: string;
  updated_at: string;
};

export type Email = {
  id: number;
  email: string;
  password: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Website = {
  id: number;
  website: string;
  url: string;
  username: string;
  password: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  repository_url?: string;
  live_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type Activity = {
  id: number;
  type: 'email' | 'website' | 'project' | 'tool' | 'domain';
  action: 'created' | 'updated' | 'deleted';
  name: string;
  description?: string;
  url?: string;
  created_at: string;
  updated_at?: string;
};

export type Domain = {
  id: number;
  domain_name: string;
  registrar?: string;
  date_of_purchase?: string;
  expire_date?: string;
  login?: string;
  password?: string;
  on_cloudflare?: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
};
