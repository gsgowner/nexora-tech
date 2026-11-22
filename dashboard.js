
(() => {
  const cfg = window.NEXORA_CONFIG || {};

  if (!cfg.supabaseUrl || !cfg.supabasePublishableKey || !window.supabase) {
    alert("NEXORA connection settings are missing. Check config.js.");
    return;
  }

  const client = window.supabase.createClient(
    cfg.supabaseUrl,
    cfg.supabasePublishableKey
  );

  async function startDashboard() {
    const { data, error } = await client.auth.getUser();

    if (error || !data.user) {
      window.location.replace("login.html");
      return;
    }

    const email = document.getElementById("userEmail");
    if (email) email.textContent = data.user.email || "";

    const logoutButton = document.getElementById("logoutBtn");

    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        await client.auth.signOut();
        window.location.href = "login.html";
      });
    }
  }

  startDashboard();
})();
