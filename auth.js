(() => {
  const cfg = window.NEXORA_CONFIG || {};
  const message = document.getElementById("message");
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");
  const configured = cfg.supabaseUrl && cfg.supabasePublishableKey &&
    !cfg.supabaseUrl.includes("PASTE_") && !cfg.supabasePublishableKey.includes("PASTE_");
  const client = configured && window.supabase
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey)
    : null;

  function show(mode) {
    const registering = mode === "register";
    loginPanel.hidden = registering;
    registerPanel.hidden = !registering;
    message.textContent = "";
    history.replaceState(null, "", registering ? "#register" : "#login");
  }
  document.getElementById("showRegister").addEventListener("click", e => {e.preventDefault(); show("register");});
  document.getElementById("showLogin").addEventListener("click", e => {e.preventDefault(); show("login");});
  if (location.hash === "#register") show("register");

  function checkConfig() {
    if (!client) {
      message.className = "message error";
      message.textContent = "Setup needed: add your Supabase Project URL and Publishable key in config.js, then commit the file.";
      return false;
    }
    return true;
  }
  document.getElementById("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    if (!checkConfig()) return;
    const button = e.currentTarget.querySelector("button");
    button.disabled = true; message.className = "message"; message.textContent = "Creating your account…";
    try {
      const {data,error} = await client.auth.signUp({
        email: document.getElementById("registerEmail").value.trim(),
        password: document.getElementById("registerPassword").value,
        options: {data: {full_name: document.getElementById("fullName").value.trim()}}
      });
      if (error) throw error;
      message.className = "message success";
      message.textContent = data.session ? "Account created. Opening your workspace…" : "Account created. Check your email to confirm your address, then sign in.";
      if (data.session) setTimeout(() => location.href = "dashboard.html", 900);
    } catch(err) {
      message.className = "message error"; message.textContent = err.message || "Could not create account.";
    } finally {button.disabled = false;}
  });
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    if (!checkConfig()) return;
    const button = e.currentTarget.querySelector("button");
    button.disabled = true; message.className = "message"; message.textContent = "Signing in…";
    try {
      const {error} = await client.auth.signInWithPassword({
        email: document.getElementById("loginEmail").value.trim(),
        password: document.getElementById("loginPassword").value
      });
      if (error) throw error;
      location.href = "dashboard.html";
    } catch(err) {
      message.className = "message error"; message.textContent = err.message || "Could not sign in.";
    } finally {button.disabled = false;}
  });
})();