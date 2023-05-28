import icons from '../../img/symbol.svg';
import View from './View';

class BreadcrumbView {
  update(path) {
    const strs = path.split('/');
    let h1 = '';
    let s = '';
    if (strs[0] === 'Quản lý') {
      h1 = strs[1];
      s += `
            <span>Quản lý</span>
            <svg class="icon">
              <use xlink:href="${icons}#icon-chevron-right"></use>
            </svg>
            <span>${strs[1]}</span>
            `;
    } else {
      h1 = strs[0];
      s += `
            <span>${strs[0]}</span>
            `;
    }

    const markup = `
        <h1>${h1}</h1>
        <div class="breadcrumb__path">
          <span>Home</span>
          <svg class="icon">
            <use xlink:href="${icons}#icon-chevron-right"></use>
          </svg>
          ${s}
        </div>
        `;
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = '';
    breadcrumb.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new BreadcrumbView();
