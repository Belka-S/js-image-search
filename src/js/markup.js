import { photoApiService, refs, createGallery } from '../index';
import imageMarkup from '../templates/gallery.hbs';
import controlsMarkup from '../templates/controls.hbs';
import { notifySearchEnd } from './notify';

// Render Controls Markup
export function renderControlsMarkup() {
  const bodyEl = document.querySelector('script');
  bodyEl.insertAdjacentHTML('beforebegin', controlsMarkup());
}

// Render Gallery Markup
export function renderGalleryMarkup(data) {
  const galleryMarkup = data.reduce((acc, el) => acc + imageMarkup(el), '');
  refs.galleryDiv.innerHTML = galleryMarkup;
}

// Create LoadMore Button
function createLoadMoreBtn() {
  if (refs.loadMoreBtn) {
    return;
  }
  const btnMarkup = '<button class="more" type="button" >Load more</button>';
  refs.galleryDiv.insertAdjacentHTML('afterend', btnMarkup);
  refs.loadMoreBtn = document.querySelector('button.more');
  refs.loadMoreBtn.addEventListener('click', createGallery);
}

// Remove LoadMore Button
function removeLoadMoreBtn() {
  refs.loadMoreBtn.remove();
  refs.loadMoreBtn.removeEventListener('click', createGallery);
  refs.loadMoreBtn = null;

  const { page, normalData, searchOptions } = photoApiService;
  normalData.length !== page * searchOptions.perPage && notifySearchEnd();
}

export { createLoadMoreBtn, removeLoadMoreBtn };
