function openBuyTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}

function redirectToWhatsApp(type, brand) {
    const message = `Hello! I'm interested in buying a ${type} - ${brand}. Please give me more details.`;
    const phoneNumber = "2347039394641"; // Replace with your WhatsApp number (without the +)
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  
    // Scroll behavior for navigation
    let lastScroll = 0;
    const nav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
      }
      
      if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
    });
  
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNav() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run once on page load
  
    // Tab functionality
    function setupTabs(containerSelector) {
      const tabButtons = document.querySelectorAll(`${containerSelector} .tab-button`);
      const tabContents = document.querySelectorAll(`${containerSelector} .tab-content`);
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons and contents
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Show corresponding content
          const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
          const tabContent = document.getElementById(tabName);
          if (tabContent) {
            tabContent.classList.add('active');
          }
        });
      });
      
      // Activate first tab by default
      if (tabButtons.length > 0) {
        tabButtons[0].click();
      }
    }
    
    // Initialize tabs for each section
    setupTabs('#buy');
    setupTabs('#sell');
    setupTabs('#ecommerce');
  
    // Filter products
    function filterProducts(brand, containerSelector) {
      const products = document.querySelectorAll(`${containerSelector} .product-item`);
      const brandButtons = document.querySelectorAll(`${containerSelector} .brand-button`);
      
      brandButtons.forEach(button => {
        button.classList.remove('active');
      });
      event.currentTarget.classList.add('active');
      
      products.forEach(product => {
        if (brand === 'all' || product.classList.contains(brand)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }
    
    // Set up filter buttons
    document.querySelectorAll('#ecommerce-phone .brand-button').forEach(button => {
      button.addEventListener('click', function() {
        const brand = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        filterProducts(brand, '#ecommerce-phone');
      });
    });
    
    document.querySelectorAll('#ecommerce-laptop .brand-button').forEach(button => {
      button.addEventListener('click', function() {
        const brand = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        filterProducts(brand, '#ecommerce-laptop');
      });
    });
  
    // Form submission handlers
    function redirectToWhatsApp(action, brand) {
      const message = `Hello, I want to ${action} a ${brand} device.`;
      window.location.href = `https://wa.me/2347039394641?text=${encodeURIComponent(message)}`;
    }
    
    function submitSellForm() {
      const form = event.target.closest('.sell-form');
      const inputs = form.querySelectorAll('input, select, textarea');
      let message = "I want to sell my gadget with the following details:\n\n";
      
      inputs.forEach(input => {
        if (input.value && input.type !== 'button' && input.type !== 'submit') {
          const label = input.previousElementSibling ? input.previousElementSibling.textContent : input.name;
          message += `${label}: ${input.value}\n`;
        }
      });
      
      window.location.href = `https://wa.me/2347039394641?text=${encodeURIComponent(message)}`;
    }
    
    function bookRepair() {
      const deviceType = document.getElementById('repair-device-type').value;
      const brand = document.getElementById('repair-brand').value;
      const model = document.getElementById('repair-model').value;
      const issue = document.getElementById('repair-issue').value;
      const description = document.getElementById('repair-description').value;
      
      let message = "I need repair service with the following details:\n\n";
      message += `Device Type: ${deviceType}\n`;
      message += `Brand: ${brand}\n`;
      message += `Model: ${model}\n`;
      message += `Issue: ${issue}\n`;
      message += `Description: ${description}`;
      
      window.location.href = `https://wa.me/2347039394641?text=${encodeURIComponent(message)}`;
    }
    
    function orderProduct(name, price) {
      const message = `Hello, I want to order ${name} (${price}). Please provide more details.`;
      window.location.href = `https://wa.me/2347039394641?text=${encodeURIComponent(message)}`;
    }
    
    // Attach event listeners to buttons
    document.querySelectorAll('.order-button').forEach(button => {
      button.addEventListener('click', function() {
        const productName = this.closest('.product-item').querySelector('h4').textContent;
        const price = this.closest('.product-item').querySelector('.price').textContent;
        orderProduct(productName, price);
      });
    });
    
    document.querySelectorAll('.submit-button').forEach(button => {
      button.addEventListener('click', submitSellForm);
    });
    
    document.querySelectorAll('.brand-card button').forEach(button => {
      button.addEventListener('click', function() {
        const action = 'buy';
        const brand = this.closest('.brand-card').querySelector('h4').textContent;
        redirectToWhatsApp(action, brand);
      });
    });
  });

  
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.getElementById("hamburger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.getElementById("navbar").classList.toggle("active");
});
