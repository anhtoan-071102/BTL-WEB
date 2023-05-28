import { fetchAPI, formatDate } from '../helper';
import { HOST_NAME } from '../config';
import * as validator from '../validator';

export const state = {
  serviceCenter: {},
  serviceCenters: [],
  totalItems: 0,
  currentPage: 1,
  perPage: 0,
  totalPage: 0,
  checkedItemId: [],
};

export const loadServiceCenters = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/serviceCenter/get-serviceCenters?page=${state.currentPage}`,
      'GET'
    );
    state.serviceCenters = data.serviceCenters;
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
      const data = await fetchAPI(
        `${HOST_NAME}/serviceCenter/get-all-id`,
        'GET'
      );

      state.checkedItemId = [...data.idArray];
    }
  } catch (error) {
    throw error;
  }
};

export const loadNamesAndIds = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/serviceCenter/get-all-names-and-ids`,
      'GET'
    );
    state.serviceCenters = data.serviceCenters;
  } catch (error) {
    throw error;
  }
};

export const addServiceCenter = async function (form) {
  try {
    if (
      [...form.querySelectorAll('input[required]')].some(input => !input.value)
    ) {
      throw new Error('Hãy điền đầy đủ thông tin');
    }
    if (!validator.isPhoneNumber(form.serviceCenterPhoneNumber.value)) {
      throw new Error('Số điện thoại không hợp lệ');
    }
    if (!validator.isEmail(form.serviceCenterEmail.value)) {
      throw new Error('Email không hợp lệ');
    }
    const data = await fetchAPI(
      `${HOST_NAME}/serviceCenter/add-serviceCenter`,
      'POST',
      {
        name: form.serviceCenterName.value,
        province: form.serviceCenterProvince.value,
        district: form.serviceCenterDistrict.value,
        ward: form.serviceCenterWard.value,
        street: form.serviceCenterStreet.value,
        phoneNumber: form.serviceCenterPhoneNumber.value,
        email: form.serviceCenterEmail.value,
      }
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
