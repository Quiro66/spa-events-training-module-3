export function renderNavbar() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) {
    document.getElementById("navbar-container").innerHTML = "";
    return;
  }
  document.getElementById("navbar-container").innerHTML = `
    <nav>
    <div class="navTitle">
    <span>SPA-Quiro66</span>
    </div>
    <div class="navLinks">
      <a href="/users" data-link>Users</a>
      <a href="/newUser" data-link ${user.role !== "Admin" ? 'style="display:none;"' : ""}>New User</a>
      <a href="/about" data-link>About</a>
      <a href="#" id="logout-link">Logout</a>
      </div>
    </nav>
  `;
  // Logout event
  document.getElementById("logout-link").onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    location.href = "/";
  };
}