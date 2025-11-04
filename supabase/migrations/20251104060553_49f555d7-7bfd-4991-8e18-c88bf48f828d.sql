-- Add 'user' role to app_role enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'user' 
    AND enumtypid = (
      SELECT oid FROM pg_type WHERE typname = 'app_role'
    )
  ) THEN
    ALTER TYPE app_role ADD VALUE 'user';
  END IF;
END $$;