import icons from '../../../img/symbol.svg';
import View from '../View';
import * as vnProvince from 'dvhcvn';

class AddAgentView extends View {
  _parentEl;
  _provinces = vnProvince.level1s;
  _str = 'agent';

  _generateMarkup() {
    this._parentEl = document.querySelector('.container--absolute');

    return `
    <div class="modal-box">
    <div class="modal">
      <div class="modal__header">
        <h1>Thêm đại lý phân phối</h1>
        <button class="btn btn-close-modal">
          <svg class="icon icon--smaller">
            <use xlink:href="${icons}}#icon-cross"></use>
          </svg>
        </button>
      </div>
      <form action="/" class="form">
        <div class="form__input-box">
          <span class="form__span form__span--required">
            Tên đại lý
          </span>
          <input
            type="text"
            class="form__input"
            id="agentName"
            placeholder="Tên đại lý"
            required
          />
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required"
            >Tỉnh/ Thành phố</span
          >
          <input
            type="hidden"
            class="form__input"
            id="agentProvince"
            required
          />
          <div class="form__select">
            <div class="form__select-value">Tỉnh/ Thành phố</div>
            <svg class="icon icon--smaller btn-show-options">
              <use
                xlink:href="${icons}}#icon-chevron-right"
              ></use>
            </svg>
            <div
              class="form__select-options form__select-options--hidden select-province"
            >
              ${this._provinces
                .map(prv => {
                  return `<div class="form__select-option">${prv.name}</div>`;
                })
                .join('')}
            </div>
          </div>
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required">Quận/ Huyện</span>
          <input
            type="hidden"
            class="form__input"
            id="agentDistrict"
            required
          />
          <div class="form__select">
            <div class="form__select-value">Quận/ Huyện</div>
            <svg class="icon icon--smaller btn-show-options">
              <use
                xlink:href="${icons}}#icon-chevron-right"
              ></use>
            </svg>
            <div
              class="form__select-options form__select-options--hidden select-district"
            >
              <div
                class="form__select-option form__select-option--disable"
              >
                Quận/ Huyện
              </div>
            </div>
          </div>
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required">Phường/ Xã</span>
          <input
            type="hidden"
            class="form__input"
            id="agentWard"
            required
          />
          <div class="form__select">
            <div class="form__select-value">Phường/ Xã</div>
            <svg class="icon icon--smaller btn-show-options">
              <use
                xlink:href="${icons}}#icon-chevron-right"
              ></use>
            </svg>
            <div
              class="form__select-options form__select-options--hidden select-ward"
            >
              <div
                class="form__select-option form__select-option--disable"
              >
                Phường/ Xã
              </div>
            </div>
          </div>
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required"
            >Địa chỉ, đường</span
          >
          <input
            type="text"
            class="form__input"
            id="agentStreet"
            placeholder="Địa chỉ, đường"
            required
          />
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required"
            >Số điện thoại</span
          >
          <input
            type="text"
            class="form__input"
            id="agentPhoneNumber"
            placeholder="Số điện thoại"
            required
          />
        </div>

        <div class="form__input-box">
          <span class="form__span form__span--required">Email</span>
          <input
            type="text"
            class="form__input"
            id="agentEmail"
            placeholder="Email"
            required
          />
        </div>

        <div class="form__submit">
          <button
            type="submit"
            class="btn btn--bg-primary btn--white btn--full btn--pd"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  </div>
        `;
  }

  addHandleSubmit(handle) {
    document.querySelector('.form').addEventListener('submit', function (e) {
      e.preventDefault();

      handle(this);
    });
  }
}

export default new AddAgentView();
