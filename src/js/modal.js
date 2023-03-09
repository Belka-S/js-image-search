import { debounce } from 'lodash';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Create SimpleLightbox
export let modal = new SimpleLightbox(
  `.gallery a`,
  {
    captionSelector: 'span',
    captionType: 'text',
    captionDelay: 1000,
    scrollZoom: false,
    close: false,
    navText: ['&#9194', '&#9193'],
    overlayOpacity: 0.7,
  },
  addEventListener('wheel', debounce(onWheel, 100))
);

function onWheel(e) {
  if (!modal.isOpen) {
    return;
  }
  e.deltaY > 0 ? modal.next() : modal.prev();
}

export function refreshSimpleLightbox() {
  window.innerWidth > 550 && modal.refresh();
}
