// ==================== Mobile Header Functions ====================
function toggleMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('open');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
    
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
}

function toggleMobileSearch(e) {
    if (!e) e = { target: document.querySelector('.mobile-search-btn i') };
    
    if (!e.target.classList.contains('ph-magnifying-glass') && 
        !e.target.closest('.ph-magnifying-glass')) {
        return;
    }
    
    const searchContainer = document.getElementById('mobileSearchContainer');
    searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
    
    if (searchContainer.style.display === 'block') {
        document.getElementById('mobileSearchInput').focus();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile auth link update
    const isLoggedIn = false; // Replace with actual auth check
    const mobileAuthLink = document.getElementById('mobile-auth-link');
    const mobileAuthIcon = document.getElementById('mobile-auth-icon');
    const mobileAuthText = document.getElementById('mobile-auth-text');
    
    if (isLoggedIn && mobileAuthLink && mobileAuthIcon && mobileAuthText) {
        mobileAuthLink.href = "account";
        mobileAuthIcon.className = "ph ph-sign-out me-10";
        mobileAuthText.textContent = "Sign Out";
    }

    // Mobile search container close handler
    document.addEventListener('click', function(event) {
        const searchContainer = document.getElementById('mobileSearchContainer');
        const searchForm = document.getElementById('mobileSearchForm');
        const searchIcon = document.querySelector('.ph-magnifying-glass');
        
        if (searchContainer && searchContainer.style.display === 'block' && 
            searchForm && !searchForm.contains(event.target) && 
            event.target !== searchIcon && 
            !event.target.closest('.mobile-search-btn')) {
            searchContainer.style.display = 'none';
        }
    });

    // Mobile search form submission
    const mobileSearchForm = document.getElementById('mobileSearchForm');
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('mobileSearchInput').value.trim();
            if (query) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        });
    }
});