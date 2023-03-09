import { debounce } from 'lodash';

import './sass/index.scss';
import { renderControlsMarkup, renderGalleryMarkup } from './js/markup';
import { createLoadMoreBtn, removeLoadMoreBtn } from './js/markup';
import { ImageApiService } from './js/api-service';
import { modal, refreshSimpleLightbox } from './js/modal';
import { startNotifyLoading, endNotifyLoading } from './js/notify';
import { scrollPage, moveHeader } from './js/key-scroll';
import { loadMoreOnSpase, loadMoreOnScroll } from './js/key-scroll';

// Create Controls Section
renderControlsMarkup();

// Create PhotoApiService
const options = {
  type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export const photoApiService = new ImageApiService(options);
export const { searchOptions, refs } = photoApiService;

// Set Loadind Limit
refs.radioForm.addEventListener('input', onInput);

function onInput(e) {
  searchOptions.perPage = e.target.value;
  localStorage.setItem('perPage', e.target.value);
}

addEventListener('load', onLoad, { once: true });

function onLoad(e) {
  if (localStorage.getItem('perPage')) {
    searchOptions.perPage = localStorage.getItem('perPage');

    refs.radioForm
      .querySelector(`[value='${searchOptions.perPage}']`)
      .setAttribute('checked', true);
  }
}

// Search Data
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  photoApiService.normalData = [];
  photoApiService.page = 0;

  createGallery();
}

// Fetch Data, Create Gallery
export function createGallery() {
  startNotifyLoading();

  photoApiService
    .fetchImages()
    .then(renderGalleryMarkup)
    .then(createLoadMoreBtn)
    .then(refreshSimpleLightbox)
    .then(loadMoreOnScroll)
    .catch(removeLoadMoreBtn)
    .finally(endNotifyLoading);
}

// Scroll by ArrowKeys
addEventListener('keydown', onArrowStroke);

function onArrowStroke(e) {
  if (e.code.includes('Arrow') && !modal.isOpen) {
    e.preventDefault();

    scrollPage(refs.galleryDiv, e);
  }
}

// Move Header on Scroll
onscroll = debounce(e => moveHeader(), 100);

// Load More on Space
addEventListener('keydown', onSpaceStroke);

function onSpaceStroke(e) {
  loadMoreOnSpase(e);
}

// <a href="http://example.com/kolbasa-primer.xlsx" download>Скачать</a>

// add Search Options

// add Download File

// add Buttons
