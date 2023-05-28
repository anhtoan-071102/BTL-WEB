import icons from '../../../img/symbol.svg';
import View from '../View';

class AgentTableView extends View {
  _parentEl;

  _generateMarkup() {
    this._parentEl = document.querySelector('.main');

    let table = '';

    if (this._data.agents.length === 0) {
      table += `<div class="table-empty">
                      <h1>Chưa có dữ liệu</h1>
                  </div>`;
    } else {
      table += `
          <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Tên đại lý</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Tổng sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              ${this._data.agents
                .map(agent => {
                  return `
                <tr>
                  <td>${agent.name}</td>
                  <td>${agent.phoneNumber}</td>
                  <td>${agent.email}</td>
                  <td>${agent.street}, ${agent.ward}, ${agent.district}, ${agent.province}</td>
                  <td>${agent.totalProducts}</td>
              </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
        <div class="pagination-box">
              ${this._generatePagination()}
          </div>
          `;
    }
    return `
        <div class="option">
        <button class="btn btn--bg-primary btn--pd btn--white btn--mg-r btn-add">
          Thêm đại lý phân phối
        </button>
      </div>
  
      <div class="main__table">
        ${table}
      </div>
        `;
  }
}

export default new AgentTableView();
