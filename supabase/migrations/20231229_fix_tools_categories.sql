-- Drop existing tools table if it exists
DROP TABLE IF EXISTS tools CASCADE;

-- Create the tools table with proper relationships
CREATE TABLE tools (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create updated_at trigger for tools
DROP TRIGGER IF EXISTS update_tools_updated_at ON tools;
CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own tools" ON tools;
DROP POLICY IF EXISTS "Users can create their own tools" ON tools;
DROP POLICY IF EXISTS "Users can update their own tools" ON tools;
DROP POLICY IF EXISTS "Users can delete their own tools" ON tools;

-- Create RLS policies
CREATE POLICY "Users can view their own tools"
ON tools FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tools"
ON tools FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tools"
ON tools FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tools"
ON tools FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add indexes
DROP INDEX IF EXISTS idx_tools_user_id;
DROP INDEX IF EXISTS idx_tools_category_id;
CREATE INDEX idx_tools_user_id ON tools(user_id);
CREATE INDEX idx_tools_category_id ON tools(category_id);

-- Verify the foreign key constraint
SELECT tc.table_schema, tc.constraint_name, tc.table_name, kcu.column_name, 
       ccu.table_schema AS foreign_table_schema,
       ccu.table_name AS foreign_table_name,
       ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='tools';
