import axios from 'axios';
import { notifyFoundNothing, notifySearchSucces } from './notify';

export class ImageApiService {
  static BASE_URL = 'https://pixabay.com/api';
  static API_KEY = '34106733-e100dcdc1add944a5aa3c5584';
  static SAEARCH_PARAMETERS = {
    type: ['all', 'photo', 'illustration', 'vector'],
    orientation: ['all', 'horizontal', 'vertical'],
    safesearch: [true, false],
    per_page: [3, 200],
  };

  #refs;

  constructor({ type = 'all', orientation = 'all', safesearch = false }) {
    this.searchOptions = { type, orientation, safesearch, perPage: 30 };
    this.page = 0;
    this.normalData = [];
    this.#refs = {
      controlsEl: document.querySelector('section.controls'),
      searchForm: document.querySelector('#search-form'),
      inputEl: document.querySelector('#search-form input'),
      radioForm: document.querySelector('#radio-form'),
      galleryDiv: document.querySelector('.gallery'),
      loadMoreBtn: null,
    };
  }

  async fetchImages() {
    const url = ImageApiService.BASE_URL;
    const key = ImageApiService.API_KEY;
    const { type, orientation, safesearch, perPage } = this.searchOptions;
    const searchQuery = this.refs.inputEl.value.trim().split(/\s+/).join('+');

    this.page += 1;

    try {
      // const response = await fetch(
      const response = await axios.get(
        `${url}/?key=${key}&q=${searchQuery}` +
          `&image_type=${type}&orientation=${orientation}&safesearch=${safesearch}` +
          `&page=${this.page}&per_page=${perPage}`
      );
      // const data = await response.json();
      const data = await response.data;
      if (!data.hits.length) {
        notifyFoundNothing();
      } else {
        notifySearchSucces(data.hits.length * this.page);
        this.normalizeData(data);
        return this.normalData;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  normalizeData(data) {
    data.hits.map(hit => {
      this.normalData.push({
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: this.normalizeNumber(hit.tags),
        likes: this.normalizeNumber(hit.likes),
        views: this.normalizeNumber(hit.views),
        comments: hit.comments,
        downloads: this.normalizeNumber(hit.downloads),
      });
    });
  }

  normalizeNumber(number) {
    const mln = Math.floor(number / 1000000);
    const thou = Math.floor(number / 1000);
    if (mln >= 1) {
      return `${mln},${thou - mln * 1000}k`;
    }
    if (thou >= 1) {
      return `${thou}k`;
    }
    return `${number}`;
  }

  set refs(newRefs) {
    this.#refs = newRefs;
  }
  get refs() {
    return this.#refs;
  }
}
