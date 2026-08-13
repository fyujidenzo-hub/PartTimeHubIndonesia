# Supabase development setup

Use a development-only Supabase project or the Supabase CLI local stack. Do not reuse production credentials.

1. Apply `migrations/0001_parttimehub_schema.sql`.
2. Optionally apply `seed.sql` for the first vacancy.
3. In Authentication settings, disable public user sign-ups.
4. Create administrator accounts manually in Authentication > Users.
5. Put the development project URL and public anon key in the root `.env`.
6. Set `VITE_ENABLE_DEMO_MODE=false` when verifying real authentication and CRUD.

The browser uses only the public anon key. The schema allows anonymous users to read active jobs and authenticated administrators to manage all jobs and company logos. Never place the service-role key in this application.
