class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .footer {
          background-color: #1E6B3A;
        }
        .footer-link {
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #BFEAD0;
        }
      </style>
      <footer class="footer text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">AgriGrow</h3>
              <p class="text-primary-100">Connecting farmers directly to buyers for fair and transparent trade.</p>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2">
                <li><a href="/market" class="footer-link text-primary-100">Market Prices</a></li>
                <li><a href="/estimator" class="footer-link text-primary-100">Profit Estimator</a></li>
                <li><a href="/weather" class="footer-link text-primary-100">Weather Forecast</a></li>
                <li><a href="/buyers" class="footer-link text-primary-100">Verified Buyers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Support</h4>
              <ul class="space-y-2">
                <li><a href="/help" class="footer-link text-primary-100">Help Center</a></li>
                <li><a href="/contact" class="footer-link text-primary-100">Contact Us</a></li>
                <li><a href="/faq" class="footer-link text-primary-100">FAQs</a></li>
                <li><a href="/ussd" class="footer-link text-primary-100">USSD Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">Connect With Us</h4>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-500 transition">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-500 transition">
                  <i data-feather="twitter"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-500 transition">
                  <i data-feather="instagram"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-500 transition">
                  <i data-feather="youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-primary-600 mt-8 pt-8 text-center text-primary-100">
            <p>&copy; ${new Date().getFullYear()} AgriGrow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);