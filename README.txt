NEXORA STUDIO — QUICK SETUP

FILES
- index.html: public landing page
- login.html: sign-in and registration
- dashboard.html: signed-in customer workspace
- config.js: the only file you must configure
- styles.css, auth.js, dashboard.js: app styling and behavior

ONE-TIME SETUP
1. Open config.js.
2. Replace PASTE_YOUR_SUPABASE_PROJECT_URL_HERE with your Supabase Project URL.
3. Replace PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE with your Supabase Publishable key.
4. Save and commit all files to the root of your GitHub repository.
5. In Supabase, open Authentication > URL Configuration.
6. Set Site URL to your GitHub Pages website address.
7. Add these Redirect URLs:
   https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/**
   and your exact GitHub Pages homepage URL.
8. In Authentication > Providers > Email, keep Email enabled.
9. In Authentication > URL Configuration, ensure the Site URL is your published website.
10. Enable GitHub Pages in repository Settings > Pages if it is not already enabled.

IMPORTANT
- Use only the Supabase Project URL and Publishable key in config.js.
- Never paste a Supabase secret key or service_role key into website files.
- Account registration and login use Supabase Auth. Email confirmation may be required depending on your Supabase settings.
- This starter package does not yet include finished graphical uniform/livery editors, saved design tables, payment processing, or admin role controls. Those are separate build stages.
- GitHub Pages serves static files; it does not run server-side code.
