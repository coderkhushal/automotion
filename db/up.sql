-- -- Apply each migration file in order
-- DO
-- $$
-- DECLARE
--     migration_file RECORD;
-- BEGIN
--     FOR migration_file IN
--         SELECT filename
--         FROM pg_ls_dir('/migrations/') AS filename
--         ORDER BY filename
--     LOOP
--         EXECUTE format('\i ''migrations/%s/%s.sql''
--         ', migration_file.filename, 'migration.sql');
--     END LOOP;
-- END;
-- $$;

-- Step 1: Create a function to publish notifications on changes
CREATE OR REPLACE FUNCTION notify_table_changes() 
RETURNS trigger 
LANGUAGE plpgsql
AS $$
BEGIN
  -- Publish a notification with the operation, table name, and row data
  PERFORM pg_notify(
    'table_changes', 
    json_build_object(
      'operation', TG_OP, 
      'table', TG_TABLE_NAME, 
      'data', CASE 
                 WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
                 ELSE row_to_json(NEW)
               END
    )::text
  );
  RETURN NEW;
END;
$$;

-- Step 2: Apply this function as a trigger on your target table
-- Replace "my_table" with the name of your table
CREATE TRIGGER table_change_trigger
AFTER INSERT OR UPDATE OR DELETE ON "MotionRunOutbox"
FOR EACH ROW EXECUTE FUNCTION notify_table_changes();
