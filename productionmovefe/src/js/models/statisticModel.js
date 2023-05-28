import { fetchAPI, formatDate } from '../helper';
import { HOST_NAME } from '../config';

export const state = {
  quantity: {
    month: {},
    quantity: 0,
  },
  saleQuantity: {
    month: {},
    saleQuantity: 0,
  },
  aQuantity: {
    month: {},
    quantity: 0,
    failed: 0,
  },
  months: [],
  now: {
    month: 0,
    year: 0,
  },
};

export const getTimeNow = function () {
  const now = new Date();
  const time = {
    month: now.getMonth(),
    year: now.getFullYear(),
  };
  return time;
};

export const loadMonths = async function () {
  try {
    const data = await fetchAPI(`${HOST_NAME}/statistic/get-months`, 'GET');
    state.months = data.months;
  } catch (error) {
    throw error;
  }
};

export const loadQuantiy = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/statistic/get-quantity/?month=${state.quantity.month.month}&year=${state.quantity.month.year}`,
      'GET'
    );
    state.quantity.quantity = data.quantity;
  } catch (error) {
    throw error;
  }
};
