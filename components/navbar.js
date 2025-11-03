class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .nav-link {
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #1E6B3A;
        }
        .mobile-menu {
          transition: all 0.3s ease;
        }
      </style>
      <nav class="navbar sticky top-0 z-50">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="flex items-center">
              <span class="text-2xl font-bold text-primary-500">AgriGrow</span>
            </a>
            
            <div class="hidden md:flex space-x-8">
              <a href="/market" class="nav-link text-gray-600">Market</a>
              <a href="/estimator" class="nav-link text-gray-600">Estimator</a>
              <a href="/listings" class="nav-link text-gray-600">My Listings</a>
              <a href="/weather" class="nav-link text-gray-600">Weather</a>
            </div>
            
            <div class="hidden md:flex items-center space-x-4">
              <a href="/auth/login" class="text-gray-600 nav-link">Login</a>
              <a href="/auth/register" class="bg-primary-500 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition">Register</a>
            </div>
            
            <button id="mobile-menu-button" class="md:hidden text-gray-600">
              <i data-feather="menu"></i>
            </button>
          </div>
          
          <!-- Mobile menu -->
          <div id="mobile-menu" class="mobile-menu hidden md:hidden mt-4 pb-4">
            <a href="/market" class="block py-2 text-gray-600 nav-link">Market</a>
            <a href="/estimator" class="block py-2 text-gray-600 nav-link">Estimator</a>
            <a href="/listings" class="block py-2 text-gray-600 nav-link">My Listings</a>
            <a href="/weather" class="block py-2 text-gray-600 nav-link">Weather</a>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href="/auth/login" class="block py-2 text-gray-600 nav-link">Login</a>
              <a href="/auth/register" class="block mt-2 bg-primary-500 text-white px-6 py-2 rounded-full font-medium text-center hover:bg-primary-600 transition">Register</a>
            </div>
          </div>
        </div>
      </nav>
    `;

    // Mobile menu toggle
    const menuButton = this.shadowRoot.getElementById('mobile-menu-button');
    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
    
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      feather.replace();
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);