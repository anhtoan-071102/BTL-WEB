import { fetchAPI } from '../helper';
import { HOST_NAME } from '../config';

export const state = {
  productLine: {
    productLine: {},
    productLines: [],
    totalItems: 0,
    currentPage: 1,
    perPage: 0,
    totalPage: 0,
    checkedItemId: [],
  },
  productModel: {
    productModel: {},
    productModels: [],
    totalItems: 0,
    currentPage: 1,
    perPage: 0,
    totalPage: 0,
    checkedItemId: [],
  },
  product: {
    product: {},
    products: [],
    totalItems: 0,
    currentPage: 1,
    perPage: 0,
    totalPage: 0,
    checkedItemId: [],
  },
};

export const loadAllPdlId = async function (checkall) {
  try {
    if (checkall == false) {
      state.productLine.checkedItemId = [];
    } else {
      const data = await fetchAPI(`${HOST_NAME}/product/get-all-pdlid`, 'GET');

      state.productLine.checkedItemId = [...data.idArray];
    }
  } catch (error) {
    throw error;
  }
};

export const loadAllPdlNameAndId = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-pdl-name-and-id`,
      'GET'
    );
    state.productLine.productLines = data.productLines;
  } catch (error) {
    throw error;
  }
};

export const loadAllModelsNameAndIdByPdl = async function (id) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-model-name-and-id-by-pdl/${id}`,
      'GET'
    );
    state.productModel.productModels = data.productModels;
  } catch (error) {
    throw error;
  }
};

export const loadProductLine = async function (id) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-product-line/${id}`,
      'GET'
    );
    state.productLine.productLine = data.productLine;
  } catch (error) {
    throw error;
  }
};

export const loadProductLines = async function () {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-product-lines?page=${state.productLine.currentPage}`,
      'GET'
    );
    state.productLine.productLines = data.productLines;
    state.productLine.totalItems = data.totalItems;
    state.productLine.perPage = data.perPage;
    state.productLine.totalPage = Math.ceil(data.totalItems / data.perPage);
  } catch (error) {
    throw error;
  }
};

export const addProductLines = async function (form) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/add-product-line`,
      'POST',
      {
        name: form.productLineName.value,
        description: form.productLineDescription.value,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const loadProductModels = async function (id) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-product-models/${id}`,
      'GET'
    );
    state.productModel.productModels = data.productModels;
  } catch (error) {
    throw error;
  }
};

export const loadProducts = async function (role, id) {
  try {
    let str = '';
    switch (role) {
      case 'Cơ sở sản xuất':
        str = 'factory';
        break;
      case 'Đại lý phân phối':
        str = 'agent';
        break;
      case 'Trung tâm bảo hành':
        str = 'serviceCenter';
        break;
      default:
        break;
    }
    const data = await fetchAPI(
      `${HOST_NAME}/product/get-${str}-warehouse/${id}?page=${state.product.currentPage}`,
      'GET'
    );
    state.product.products = data.products;
    state.product.totalItems = data.totalItems;
    state.product.perPage = data.perPage;
    state.product.totalPage = Math.ceil(data.totalItems / data.perPage);
  } catch (error) {
    throw error;
  }
};

export const addFactoryProducts = async function (factoryId, form) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/add-factory-products/${factoryId}`,
      'POST',
      {
        productLine: form.productLine.value,
        productModel: form.productModel.value,
        quantity: form.quantity.value,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const loadAllProductId = async function (checkall, id) {
  try {
    if (checkall == false) {
      state.product.checkedItemId = [];
    } else {
      const data = await fetchAPI(
        `${HOST_NAME}/product/get-all-id/${id}`,
        'GET'
      );
      state.product.checkedItemId = data.productIds;
    }
  } catch (error) {
    throw error;
  }
};

export const addAgentProducts = async function (form, factoryId) {
  try {
    const data = await fetchAPI(
      `${HOST_NAME}/product/add-agent-products/${form.productAgent.value}`,
      'PUT',
      {
        factory: factoryId,
        productIds: JSON.stringify(state.product.checkedItemId),
      }
    );
  } catch (error) {
    throw error;
  }
};

export const updateCheckProductLineItem = function (checkbox) {
  const index = state.productLine.checkedItemId.indexOf(checkbox.value);

  if (!checkbox.checked) {
    if (index > -1) state.productLine.checkedItemId.splice(index, 1);
  } else {
    if (index === -1) state.productLine.checkedItemId.push(checkbox.value);
  }
};

export const updateCheckProductItem = function (checkbox) {
  const index = state.product.checkedItemId.indexOf(checkbox.value);

  if (!checkbox.checked) {
    if (index > -1) state.product.checkedItemId.splice(index, 1);
  } else {
    if (index === -1) state.product.checkedItemId.push(checkbox.value);
  }
};
