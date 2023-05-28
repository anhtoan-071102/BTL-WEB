import { fetchAPI, formatDate } from '../helper';
import { HOST_NAME } from '../config';
import * as validator from '../validator';

export const state = {
  factory: {},
  factories: [],
  totalItems: 0,
  currentPage: 1,
  perPage: 0,
  totalPage: 0,
  checkedItemId: [],
};

export const loadFactories = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/factory/get-factories?page=${state.currentPage}`,
      'GET'
    );
    state.factories = data.factories;
    state.totalItems = data.totalItems;
    state.perPage = data.perPage;
    state.totalPage = Math.ceil(data.totalItems / data.perPage);
  } catch (error) {
    throw error;
  }
};

export const loadAllId = async function (checkall) {
  try {
    if (checkall == false) {
      state.checkedItemId = [];
    } else {
      const data = await fetchAPI(`${HOST_NAME}/factory/get-all-id`, 'GET');

      state.checkedItemId = [...data.idArray];
    }
  } catch (error) {
    throw error;
  }
};

export const addFactory = async function (form) {
  try {
    if (
      [...form.querySelectorAll('input[required]')].some(input => !input.value)
    ) {
      throw new Error('Hãy điền đầy đủ thông tin');
    }
    if (!validator.isPhoneNumber(form.factoryPhoneNumber.value)) {
      throw new Error('Số điện thoại không hợp lệ');
    }
    if (!validator.isEmail(form.factoryEmail.value)) {
      throw new Error('Email không hợp lệ');
    }
    const data = await fetchAPI(`${HOST_NAME}/factory/add-factory`, 'POST', {
      name: form.factoryName.value,
      province: form.factoryProvince.value,
      district: form.factoryDistrict.value,
      ward: form.factoryWard.value,
      street: form.factoryStreet.value,
      phoneNumber: form.factoryPhoneNumber.value,
      email: form.factoryEmail.value,
    });
  } catch (error) {
    throw error;
  }
};

export const loadNamesAndIds = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/factory/get-all-names-and-ids`,
      'GET'
    );
    state.factories = data.factories;
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
