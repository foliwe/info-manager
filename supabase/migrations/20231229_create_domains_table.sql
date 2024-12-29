-- Create my_domains table
CREATE TABLE my_domains (
    id BIGSERIAL PRIMARY KEY,
    domain_name VARCHAR(255) NOT NULL,
    registrar VARCHAR(255),
    date_of_purchase DATE,
    expire_date DATE,
    login VARCHAR(255),
    password VARCHAR(255),
    on_cloudflare BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE my_domains ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own domains"
ON my_domains FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own domains"
ON my_domains FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own domains"
ON my_domains FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own domains"
ON my_domains FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
