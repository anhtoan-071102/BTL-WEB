import { fetchAPI, fetchWithFormData, formatDate } from '../helper';
import { HOST_NAME } from '../config';
import * as validator from '../validator';

export const state = {
  user: {},
  users: [],
  totalItems: 0,
  currentPage: 1,
  perPage: 0,
  totalPage: 0,
  checkedItemId: [],
};

export const loadUsers = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/user/get-users?page=${state.currentPage}`,
      'GET'
    );
    state.users = data.users;
    state.totalItems = data.totalItems;
    state.perPage = data.perPage;
    state.totalPage = Math.ceil(data.totalItems / data.perPage);
  } catch (error) {
    throw error;
  }
};

export const loadAllId = async function () {
  try {
    const data = await fetchAPI(`${HOST_NAME}/user/get-all-id`, 'GET');
    state.checkedItemId = data.userIds;
  } catch (error) {
    throw error;
  }
};

export const addUser = async function (form) {
  try {
    if (!form.userImage.files[0]) {
      throw new Error('Chưa có hình ảnh');
    }
    if (form.userPassword.value.length < 6) {
      throw new Error('Mật khẩu phải lớn hơn 6 kí tự');
    }
    if (form.userRole.value !== 'Ban điều hành') {
      if (
        [...form.querySelectorAll('.user-workplace .form__input')].every(
          input => !input.value
        )
      ) {
        throw new Error('Bạn chưa có chọn nơi làm việc');
      }
    }
    if (!validator.isPhoneNumber(form.userPhoneNumber.value)) {
      throw new Error('Số điện thoại không hợp lệ');
    }
    if (!validator.isEmail(form.userEmail.value)) {
      throw new Error('Email không hợp lệ');
    }
    const formData = new FormData();
    formData.append('image', form.userImage.files[0]);
    formData.append('username', form.userUsername.value);
    formData.append('password', form.userPassword.value);
    formData.append('name', form.userName.value);
    formData.append('role', form.userRole.value);
    formData.append('factory', form.userFactory.value);
    formData.append('agent', form.userAgent.value);
    formData.append('serviceCenter', form.userServiceCenter.value);
    formData.append('phoneNumber', form.userPhoneNumber.value);
    formData.append('email', form.userEmail.value);
    const data = await fetchWithFormData(
      `${HOST_NAME}/user/add-user`,
      'POST',
      formData
    );
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/user/${JSON.stringify(state.checkedItemId)}`,
      'DELETE'
    );
  } catch (error) {
    throw error;
  }
};

export const updateCheckItem = function (checkbox) {
  const index = state.checkedItemId.indexOf(checkbox.value);

  if (!checkbox.checked) {
    if (index > -1) state.checkedItemId.splice(index, 1);
  } else {
    if (index === -1) state.checkedItemId.push(checkbox.value);
  }
};
