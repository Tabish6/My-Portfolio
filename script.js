// 1. Initialize Icons (Required for Lucide to work)
lucide.createIcons();

// 2. Navigation Functionality
function showPage(pageId) {
    // Hide all pages
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the specific page clicked
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update Navigation Button Styles (Desktop)
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add 'active' class to the button that was clicked
    const activeBtn = document.getElementById('nav-' + pageId);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Close mobile menu if it is currently open
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// 3. Artifact Tabs Functionality (QA Artifacts Page)
function showTab(tabName) {
    // Hide all tab content blocks
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('block');
    });

    // Show the specific tab content
    const selectedTab = document.getElementById('tab-' + tabName);
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
        selectedTab.classList.add('block');
    }

    // Reset all tab buttons to default style (gray/white)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.className = "tab-btn px-4 py-2 rounded-lg font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all";
    });
    
    // Highlight the active button with a specific color
    const activeBtn = document.getElementById('btn-' + tabName);
    if (activeBtn) {
        if(tabName === 'bug') activeBtn.className = "tab-btn px-4 py-2 rounded-lg font-medium bg-red-500 text-white shadow-lg transition-all";
        if(tabName === 'plan') activeBtn.className = "tab-btn px-4 py-2 rounded-lg font-medium bg-blue-600 text-white shadow-lg transition-all";
        if(tabName === 'api') activeBtn.className = "tab-btn px-4 py-2 rounded-lg font-medium bg-purple-600 text-white shadow-lg transition-all";
    }
}

// 4. Contact Form Logic (Web3Forms)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    // Only proceed if form exists on the page
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Create form data object
            const formData = new FormData(form);
            // Append your access key (Updated with the key you provided)
            formData.append("access_key", "2640e48b-fd38-4572-9e9d-77c7b195a03a");

            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + data.message);
                }

            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});