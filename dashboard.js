(() => {
  const cfg = window.NEXORA_CONFIG || {};
  const configured = cfg.supabaseUrl && cfg.supabasePublishableKey &&
    !cfg.supabaseUrl.includes("PASTE_") && !cfg.supabasePublishableKey.includes("PASTE_");
  if (!configured || !window.supabase) {
    location.replace("login.html"); return;
  }
  const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey);
  (async () => {
    const {data,error} = await client.auth.getUser();
    if (error || !data.user) {location.replace("login.html"); return;}
    document.getElementById("userEmail").textContent = data.user.email || "";
  })();
  document.getElementById("logout").addEventListener("click", async () => {
    await client.auth.signOut();
    location.href = "login.html";
  });
})();