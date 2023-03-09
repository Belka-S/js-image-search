import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const options = {
  position: 'center-center',
  timeout: 3000,
  fontSize: '2vmin',
  width: '40vmin',
};

function notifyFoundNothing() {
  const message =
    'Sorry, there are no images matching your search query. Please try again.';
  Notify.failure(message, options);
}

function notifySearchEnd() {
  const message = "We're sorry, but you've reached the end of search results.";
  Notify.failure(message, options);
}

function notifySearchSucces(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, options);
}

const startNotifyLoading = () => Loading.pulse();
const endNotifyLoading = () => Loading.remove();

export { notifyFoundNothing, notifySearchSucces, notifySearchEnd };
export { startNotifyLoading, endNotifyLoading };
