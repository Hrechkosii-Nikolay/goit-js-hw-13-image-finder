import './sass/main.scss';
import markupImgCard from './templates/markupImgCard.hbs';
import ApiService from './js/apiService.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  btnSubmit: document.querySelector('.btn-submit'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.js-btn-load-more'),
};

const ApiImg = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLodeMore);

function onSearch(e) {
  e.preventDefault();

  ApiImg.query = e.currentTarget.elements.query.value;
  if (ApiImg.query.trim() === '') {
    return alert('Sorry, enter query');
  }
  ApiImg.resetPage();
  clearImgList();
  fetchImages();
  e.currentTarget.elements.query.value = '';

  refs.btnLoadMore.classList.remove('is-hidden');
}

function fetchImages() {
  ApiImg.fetchImg()
    .then(hits => {
      if (hits.length === 0) {
        return;
      }
      addImgsMarkup(hits);
    })
    .catch(error => console.error);
}

function addImgsMarkup(img) {
  refs.gallery.insertAdjacentHTML('beforeend', markupImgCard(img));
}

function clearImgList() {
  refs.gallery.innerHTML = '';
}

function onLodeMore() {
  ApiImg.fetchImg().then(addImgsMarkup).then(scrollDown);
}

function scrollDown() {
  refs.btnLoadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
