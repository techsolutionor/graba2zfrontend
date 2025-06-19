let lightboxImg, lightbox, thumbsContainer;
let imageUrls = [];
let currentIndex = 0;
let zoomLevel = 1;

function fetchProductImages(slug) {
  const API_URL = 'https://websitegrabatoz-production.up.railway.app/api/products/' + slug;
  const IMAGE_BASE = 'https://grabatoz-production.up.railway.app';
  const PLACEHOLDER = 'https://via.placeholder.com/600x800?text=No+Image';

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

      imageUrls = (paths && paths.length > 0)
        ? paths.map(p => `${IMAGE_BASE}/${p.replace(/\\/g, '/')}`)
        : [PLACEHOLDER];

      openLightbox(0);
    })
    .catch(err => {
      console.error('❌ Error loading images:', err);
      imageUrls = [PLACEHOLDER];
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

function closeLightbox() {
  lightbox.style.display = 'none';
  document.exitFullscreen?.();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageUrls.length;
  updateImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
  updateImage();
}

function zoomIn() {
  zoomLevel = Math.min(3, zoomLevel + 0.2);
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}

function zoomOut() {
  zoomLevel = Math.max(0.5, zoomLevel - 0.2);
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// ✅ Main init trigger (used from outside after lightbox injected)
function initializeLightbox() {
  lightboxImg = document.getElementById('lightbox-img');
  lightbox = document.getElementById('lightbox');
  thumbsContainer = document.getElementById('lightbox-thumbs');

  const slug = localStorage.getItem('grz_slug');
  if (slug) fetchProductImages(slug);
}
