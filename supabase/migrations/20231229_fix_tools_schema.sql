-- Alter the tools table to make password and login_details nullable
ALTER TABLE tools 
ALTER COLUMN password DROP NOT NULL,
ALTER COLUMN login_details DROP NOT NULL;
