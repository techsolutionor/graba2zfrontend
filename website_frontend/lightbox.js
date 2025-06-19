(() => {
  // ✅ Encapsulated variables (won't conflict globally)
  let lightboxImg, lightbox, thumbsContainer;
  let imageUrls = [];
  let currentIndex = 0;
  let zoomLevel = 1;

  window.initializeLightbox = function () {
    lightboxImg = document.getElementById('lightbox-img');
    lightbox = document.getElementById('lightbox');
    thumbsContainer = document.getElementById('lightbox-thumbs');

    const slug = localStorage.getItem('grz_slug');
    if (slug) fetchProductImages(slug);
  };

  function fetchProductImages(slug) {
    const API_URL = 'https://websitegrabatoz-production.up.railway.app/api/products/' + slug;

    fetch(API_URL)
      .then(res => res.json())
      .then(product => {
        let paths = product.image_paths;
        if (typeof paths === 'string') {
          try {
            paths = JSON.parse(paths);
          } catch {
            paths = [];
          }
        }

        const baseUrl = 'https://grabatoz-production.up.railway.app';
        imageUrls = (paths && paths.length > 0)
          ? paths.map(p => `${baseUrl}/${p.replace(/\\/g, '/')}`)
          : ['https://via.placeholder.com/600x400?text=No+Image'];

        openLightbox(0);
      })
      .catch(err => {
        console.error('Error loading product images in lightbox:', err);
        imageUrls = ['https://via.placeholder.com/600x400?text=No+Image'];
        openLightbox(0);
      });
  }

  function openLightbox(index) {
    currentIndex = index;
    zoomLevel = 1;
    lightbox.style.display = 'flex';
    updateImage();
  }

  function updateImage() {
    lightboxImg.src = imageUrls[currentIndex];
    lightboxImg.style.transform = `scale(${zoomLevel})`;
    renderThumbnails();
  }

  function renderThumbnails() {
    thumbsContainer.innerHTML = '';
    imageUrls.forEach((url, index) => {
      const img = document.createElement('img');
      img.src = url;
      if (index === currentIndex) img.classList.add('active');
      img.onclick = () => {
        currentIndex = index;
        updateImage();
      };
      thumbsContainer.appendChild(img);
    });
  }

  window.closeLightbox = function () {
    lightbox.style.display = 'none';
    document.exitFullscreen?.();
  };

  window.nextImage = function () {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    updateImage();
  };

  window.prevImage = function () {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    updateImage();
  };

  window.zoomIn = function () {
    zoomLevel = Math.min(3, zoomLevel + 0.2);
    lightboxImg.style.transform = `scale(${zoomLevel})`;
  };

  window.zoomOut = function () {
    zoomLevel = Math.max(0.5, zoomLevel - 0.2);
    lightboxImg.style.transform = `scale(${zoomLevel})`;
  };

  window.toggleFullscreen = function () {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
})();
