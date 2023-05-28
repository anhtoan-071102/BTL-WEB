import loginView from './views/loginView';

import productLineTableView from './views/productLine/productLineTableView';
import addProductLineView from './views/productLine/addProductLineView';
import productLineDetailView from './views/productLine/productLineDetailView';
import productModelsView from './views/productModel/productModelsView';

import warehouseTableView from './views/warehouse/warehouseTableView';
import addFactoryProductView from './views/warehouse/addFactoryProductView';
import addAgentProductView from './views/warehouse/AddAgentProductView';

import factoryTableView from './views/factory/factoryTableView';
import addFactoryView from './views/factory/addFactoryView';

import agentTableView from './views/agent/agentTableView';
import addAgentView from './views/agent/addAgentView';

import scenterTableView from './views/serviceCenter/scenterTableView';
import addSCenterView from './views/serviceCenter/addSCenterView';

import userTableView from './views/user/userTableView';
import addUserView from './views/user/addUserView';
import deleteUserView from './views/user/deleteUserView';

import statisticView from './views/statistic/statisticView';
import statisticSaleView from './views/statistic/statisticSaleView';
import statisticQuantityView from './views/statistic/statisticQuantityView';
import statisticFailedRateView from './views/statistic/statisticFailedRateView';

import navView from './views/navView';
import topbarView from './views/topbarView';
import breadcrumbView from './views/breadcrumbView';

import containerView from './views/containerView';

import * as authModel from './models/authModel';
import * as productModel from './models/productModel';
import * as factoryModel from './models/factoryModel';
import * as agentModel from './models/agentModel';
import * as sCenterModel from './models/sCenterModel';
import * as userModel from './models/userModel';
import * as statisticModel from './models/statisticModel';

const controlLogin = async function (form) {
  try {
    await authModel.checkLogin(form);
    init();
  } catch (error) {
    console.error(error);
    loginView.renderError(error.message);
  }
};

const loginInit = function () {
  containerView.createAuthView();
  loginView.render();
  loginView.addHandleShowPassword();
  loginView.addHandleSubmit(controlLogin);
};

const controlLoadProductLines = async function () {
  try {
    await productModel.loadProductLines();
    initProductLineView();
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const controlProductLinePagination = async function (gotoPage) {
  try {
    productModel.state.productLine.currentPage = gotoPage;
    await productModel.loadProductLines();
    initProductLineView();
  } catch (error) {
    console.error(error);
  }
};

const controlAddProductLine = async function (form) {
  try {
    await productModel.addProductLines(form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadProductLines();
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddProductLineView = function () {
  containerView.createAbsoluteView();
  addProductLineView.render();
  addProductLineView.addHandleCloseModal();
  addProductLineView.addHandleSubmit(controlAddProductLine);
};

const controlProductLineDetailView = async function (id) {
  try {
    await productModel.loadProductLine(id);
    productLineDetailView.render(productModel.state.productLine.productLine);
    await productModel.loadProductModels(id);
    productModelsView.render(productModel.state.productModel.productModels);
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const initProductLineView = function () {
  productLineTableView.render(productModel.state.productLine);
  productLineTableView.addHandleAddData(controlAddProductLineView);
  productLineTableView.addHandlePagination(controlProductLinePagination);
  productLineTableView.addHandleViewDetail(controlProductLineDetailView);
};

const controlLoadFactories = async function () {
  try {
    await factoryModel.loadFactories();
    initFactoryView();
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const controlFactoryPagination = async function (gotoPage) {
  try {
    factoryModel.state.currentPage = gotoPage;
    await factoryModel.loadFactories();
    initFactoryView();
  } catch (error) {
    console.error(error);
  }
};

const controlAddFactory = async function (form) {
  try {
    await factoryModel.addFactory(form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadFactories();
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddFactoryView = function () {
  containerView.createAbsoluteView();
  addFactoryView.render();
  addFactoryView.addHandleCloseModal();
  addFactoryView.addHandleToggleSelectOptions();
  addFactoryView.addHandleChooseProvince();
  addFactoryView.addHandleChooseDistrict();
  addFactoryView.addHandleChooseWard();
  addFactoryView.addHandleSubmit(controlAddFactory);
};

const initFactoryView = function () {
  factoryTableView.render(factoryModel.state);
  factoryTableView.addHandlePagination(controlFactoryPagination);
  factoryTableView.addHandleAddData(controlAddFactoryView);
};

const controlLoadAgents = async function () {
  try {
    await agentModel.loadAgents();
    initAgentView();
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const controlAgentPagination = async function (gotoPage) {
  try {
    agentModel.state.currentPage = gotoPage;
    await agentModel.loadAgents();
    initAgentView();
  } catch (error) {
    console.error(error);
  }
};

const controlAddAgent = async function (form) {
  try {
    await agentModel.addAgent(form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadAgents();
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddAgentView = function () {
  containerView.createAbsoluteView();
  addAgentView.render();
  addAgentView.addHandleCloseModal();
  addAgentView.addHandleToggleSelectOptions();
  addAgentView.addHandleChooseProvince();
  addAgentView.addHandleChooseDistrict();
  addAgentView.addHandleChooseWard();
  addAgentView.addHandleSubmit(controlAddAgent);
};

const initAgentView = function () {
  agentTableView.render(agentModel.state);
  agentTableView.addHandleAddData(controlAddAgentView);
  agentTableView.addHandlePagination(controlAgentPagination);
};

const controlLoadServiceCenters = async function () {
  try {
    await sCenterModel.loadServiceCenters();
    initServiceCenterView();
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const controlServiceCenterPagination = async function (gotoPage) {
  try {
    sCenterModel.state.currentPage = gotoPage;
    await sCenterModel.loadServiceCenters();
    initServiceCenterView();
  } catch (error) {
    console.error(error);
  }
};

const controlAddServiceCenter = async function (form) {
  try {
    await sCenterModel.addServiceCenter(form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadServiceCenters();
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddServiceCenterView = function () {
  containerView.createAbsoluteView();
  addSCenterView.render();
  addSCenterView.addHandleCloseModal();
  addSCenterView.addHandleToggleSelectOptions();
  addSCenterView.addHandleChooseProvince();
  addSCenterView.addHandleChooseDistrict();
  addSCenterView.addHandleChooseWard();
  addSCenterView.addHandleSubmit(controlAddServiceCenter);
};

const initServiceCenterView = function () {
  scenterTableView.render(sCenterModel.state);
  scenterTableView.addHandleAddData(controlAddServiceCenterView);
  scenterTableView.addHandlePagination(controlServiceCenterPagination);
};

const controlLoadUsers = async function () {
  try {
    await userModel.loadUsers();
    initUserView();
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const controlUserPagination = async function (gotoPage) {
  try {
    userModel.state.currentPage = gotoPage;
    await userModel.loadUsers();
    initUserView();
  } catch (error) {
    console.error(error);
  }
};

const controlUserCheckAll = async function (checkall) {
  try {
    await userModel.loadAllId(checkall);
  } catch (error) {
    console.error(error);
  }
};

const controlUserCheckBox = function (checkbox) {
  userModel.updateCheckItem(checkbox);
  userTableView.updateCheckAllBox(userModel.state);
};

const controlChooseUserRole = async function (role) {
  try {
    switch (role) {
      case 'Ban điều hành':
        addUserView.updateWorlplace();
        break;
      case 'Cơ sở sản xuất':
        await factoryModel.loadNamesAndIds();
        console.log(factoryModel.state.factories);
        addUserView.updateWorlplace(
          factoryModel.state.factories,
          'Cơ sở sản xuất'
        );
        break;
      case 'Đại lý phân phối':
        await agentModel.loadNamesAndIds();
        addUserView.updateWorlplace(
          agentModel.state.agents,
          'Đại lý phân phối'
        );
        break;
      case 'Trung tâm bảo hành':
        await sCenterModel.loadNamesAndIds();
        addUserView.updateWorlplace(
          sCenterModel.state.serviceCenters,
          'Trung tâm bảo hành'
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

const controlAddUser = async function (form) {
  try {
    await userModel.addUser(form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadUsers();
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddUserView = function () {
  containerView.createAbsoluteView();
  addUserView.render();
  addUserView.addHandleCloseModal();
  addUserView.addHandleToggleSelectOptions();
  addUserView.addHandleChooseRole(controlChooseUserRole);
  addUserView.addHandleChooseWorkplace();
  addUserView.addHandleThumbnail('user');
  addUserView.addHandleSubmit(controlAddUser);
};

const initUserView = function () {
  userTableView.render(userModel.state);
  userTableView.addHandleAddData(controlAddUserView);
  userTableView.addHandlePagination(controlUserPagination);
  userTableView.addHandleCheckAll(controlUserCheckAll);
  userTableView.addHandleCheckBox(controlUserCheckBox);
};

const controlLoadProducts = async function (role) {
  try {
    await productModel.loadProducts(role, authModel.getWorkplaceId());
    initWareHouseView();
  } catch (error) {
    console.error(error);
  }
};

const controlChooseProductLine = async function (id) {
  try {
    await productModel.loadAllModelsNameAndIdByPdl(id);
    addFactoryProductView.updateModels({
      productLines: productModel.state.productLine.productLines,
      productModels: productModel.state.productModel.productModels,
    });
  } catch (error) {
    console.error(error);
  }
};

const controlAddFactoryProducts = async function (form) {
  try {
    await productModel.addFactoryProducts(authModel.state.factory, form);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadProducts(authModel.state.role);
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddFactoryProductsView = async function () {
  try {
    await productModel.loadAllPdlNameAndId();
    containerView.createAbsoluteView();
    addFactoryProductView.render({
      productLines: productModel.state.productLine.productLines,
      productModels: productModel.state.productModel.productModels,
    });
    addFactoryProductView.addHandleToggleSelectOptions();
    addFactoryProductView.addHandleCloseModal();
    addFactoryProductView.addHandleChoosePdl(controlChooseProductLine);
    addFactoryProductView.addHandleChooseModel();
    addFactoryProductView.addHandleSubmit(controlAddFactoryProducts);
  } catch (error) {
    console.error(error);
  }
};

const controlProductsPagination = async function (gotoPage) {
  try {
    productModel.state.product.currentPage = gotoPage;
    await productModel.loadProducts(
      authModel.state.role,
      authModel.getWorkplaceId()
    );
    initWareHouseView();
  } catch (error) {
    console.error(error);
  }
};

const controlProductsCheckAll = async function (checkall) {
  try {
    await productModel.loadAllProductId(checkall, authModel.getWorkplaceId);
  } catch (error) {
    console.error(error);
  }
};

const controlProductsCheckBox = function (checkbox) {
  productModel.updateCheckProductItem(checkbox);
  warehouseTableView.updateCheckAllBox(productModel.state.product);
};

const controlAddAgentProduct = async function (form) {
  try {
    await productModel.addAgentProducts(form, authModel.state.factory);
    containerView.renderFormSuccess('Thêm thành công');
    controlLoadProducts(authModel.state.role);
  } catch (error) {
    console.error(error);
    containerView.renderFormError(error.message);
  }
};

const controlAddAgentProductView = async function () {
  try {
    if (productModel.state.product.checkedItemId.length === 0) {
      throw new Error('Bạn chưa chọn sản phẩm');
    }
    await agentModel.loadNamesAndIds();
    containerView.createAbsoluteView();
    addAgentProductView.render(agentModel.state.agents);
    addAgentProductView.addHandleCloseModal();
    addAgentProductView.addHandleToggleSelectOptions();
    addAgentProductView.addHandleChooseAgent();
    addAgentProductView.addHandleAddSubmit(controlAddAgentProduct);
  } catch (error) {
    console.error(error);
    containerView.renderNotice(error.message);
  }
};

const initWareHouseView = function () {
  warehouseTableView.render({
    product: productModel.state.product,
    role: authModel.state.role,
  });
  warehouseTableView.addHandleAddFactoryProducts(controlAddFactoryProductsView);
  warehouseTableView.addHandleGiveProductsToAgent(controlAddAgentProductView);
  warehouseTableView.addHandlePagination(controlProductsPagination);
  warehouseTableView.addHandleCheckAll(controlProductsCheckAll);
  warehouseTableView.addHandleCheckBox(controlProductsCheckBox);
};

const controlLoadQuantity = async function () {
  try {
    statisticModel.state.quantity.month = statisticModel.getTimeNow();
    await statisticModel.loadQuantiy();
    statisticQuantityView.render({
      months: statisticModel.state.months,
      quantity: statisticModel.state.quantity,
    });
  } catch (error) {
    console.error(error);
  }
};

const initStatisticView = async function () {
  try {
    await statisticModel.loadMonths();
    statisticView.render();
    controlLoadQuantity();
  } catch (error) {
    console.error(error);
  }
};

const controlNav = function (path) {
  breadcrumbView.update(path);
  switch (path) {
    case 'Quản lý/Dòng sản phẩm':
      productModel.state.productLine.checkedItemId = [];
      productModel.state.productLine.currentPage = 1;
      controlLoadProductLines();
      break;
    case 'Quản lý/Cơ sở sản xuất':
      factoryModel.state.checkedItemId = [];
      factoryModel.state.currentPage = 1;
      controlLoadFactories();
      break;
    case 'Quản lý/Đại lý phân phối':
      agentModel.state.checkedItemId = [];
      agentModel.state.currentPage = 1;
      controlLoadAgents();
      break;
    case 'Quản lý/Trung tâm bảo hành':
      sCenterModel.state.checkedItemId = [];
      sCenterModel.state.currentPage = 1;
      controlLoadServiceCenters();
      break;
    case 'Quản lý/Người dùng':
      userModel.state.checkedItemId = [];
      userModel.state.currentPage = 1;
      controlLoadUsers();
      break;
    case 'Quản lý/Kho':
      productModel.state.product.checkedItemId = [];
      productModel.state.product.currentPage = 1;
      controlLoadProducts(authModel.state.role);
      break;
    case 'Thống kê':
      initStatisticView();
      break;
    default:
      break;
  }
};

const navInit = function () {
  navView.render(authModel.state.role);
  navView.addHandleClick(controlNav);
};

const controlShowSidebar = function () {
  navView.toggleSidebar();
};

const topbarInit = function () {
  topbarView.render(authModel.state.user);
  topbarView.addHandleShowSidebar(controlShowSidebar);
};

const init = function () {
  containerView.createAppView();
  navInit();
  topbarInit();
  if (authModel.state.role === 'Ban điều hành') {
    controlLoadProductLines();
  } else {
    breadcrumbView.update('Quản lý/ Kho');
    controlLoadProducts(authModel.state.role);
  }
};

loginInit();
