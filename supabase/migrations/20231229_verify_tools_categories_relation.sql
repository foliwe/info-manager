-- Verify categories table exists and has correct structure
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'categories'
    ) THEN
        CREATE TABLE categories (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    END IF;
END $$;

-- Verify tools table exists and has correct structure
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'tools'
    ) THEN
        CREATE TABLE tools (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            url VARCHAR(255),
            login_details VARCHAR(255),
            password VARCHAR(255),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
            category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
    END IF;
END $$;

-- Drop existing foreign key if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
            ON tc.constraint_name = kcu.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = 'tools'
        AND kcu.column_name = 'category_id'
        AND tc.table_schema = 'public'
    ) THEN
        ALTER TABLE tools DROP CONSTRAINT IF EXISTS tools_category_id_fkey;
    END IF;
END $$;

-- Add foreign key constraint
ALTER TABLE tools
ADD CONSTRAINT tools_category_id_fkey
FOREIGN KEY (category_id)
REFERENCES categories(id)
ON DELETE SET NULL;

-- Enable RLS if not already enabled
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist for tools
DO $$ 
BEGIN
    -- Drop existing policies if any
    DROP POLICY IF EXISTS "Users can view their own tools" ON tools;
    DROP POLICY IF EXISTS "Users can create their own tools" ON tools;
    DROP POLICY IF EXISTS "Users can update their own tools" ON tools;
    DROP POLICY IF EXISTS "Users can delete their own tools" ON tools;

    -- Create new policies
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
END $$;

-- Ensure RLS policies exist for categories
DO $$ 
BEGIN
    -- Drop existing policies if any
    DROP POLICY IF EXISTS "Everyone can view categories" ON categories;
    DROP POLICY IF EXISTS "Everyone can create categories" ON categories;
    DROP POLICY IF EXISTS "Everyone can update categories" ON categories;
    DROP POLICY IF EXISTS "Everyone can delete categories" ON categories;

    -- Create new policies
    CREATE POLICY "Everyone can view categories"
    ON categories FOR SELECT
    TO authenticated
    USING (true);

    CREATE POLICY "Everyone can create categories"
    ON categories FOR INSERT
    TO authenticated
    WITH CHECK (true);

    CREATE POLICY "Everyone can update categories"
    ON categories FOR UPDATE
    TO authenticated
    USING (true);

    CREATE POLICY "Everyone can delete categories"
    ON categories FOR DELETE
    TO authenticated
    USING (true);
END $$;
