import { fetchAPI, formatDate } from '../helper';
import { HOST_NAME } from '../config';
import * as validator from '../validator';

export const state = {
  agent: {},
  agents: [],
  totalItems: 0,
  currentPage: 1,
  perPage: 0,
  totalPage: 0,
  checkedItemId: [],
};

export const loadAgents = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/agent/get-agents?page=${state.currentPage}`,
      'GET'
    );
    state.agents = data.agents;
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
      const data = await fetchAPI(`${HOST_NAME}/agent/get-all-id`, 'GET');

      state.checkedItemId = [...data.idArray];
    }
  } catch (error) {
    throw error;
  }
};

export const loadNamesAndIds = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/agent/get-all-names-and-ids`,
      'GET'
    );
    state.agents = data.agents;
  } catch (error) {
    throw error;
  }
};

export const addAgent = async function (form) {
  try {
    if (
      [...form.querySelectorAll('input[required]')].some(input => !input.value)
    ) {
      throw new Error('Hãy điền đầy đủ thông tin');
    }
    if (!validator.isPhoneNumber(form.agentPhoneNumber.value)) {
      throw new Error('Số điện thoại không hợp lệ');
    }
    if (!validator.isEmail(form.agentEmail.value)) {
      throw new Error('Email không hợp lệ');
    }
    const data = await fetchAPI(`${HOST_NAME}/agent/add-agent`, 'POST', {
      name: form.agentName.value,
      province: form.agentProvince.value,
      district: form.agentDistrict.value,
      ward: form.agentWard.value,
      street: form.agentStreet.value,
      phoneNumber: form.agentPhoneNumber.value,
      email: form.agentEmail.value,
    });
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
