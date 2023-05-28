import { fetchAPI } from '../helper';
import { HOST_NAME } from '../config';

export const state = {
  token: '',
  role: '',
  factory: '',
  agent: '',
  serviceCenter: '',
  userId: '',
  user: {
    imageUrl: '',
    name: '',
  },
};

export const checkLogin = async function (form) {
  try {
    if (form.auth_password.value.length < 6) {
      throw new Error('Mật khẩu phải từ 6 kí tự trở lên');
    }
    const data = await fetchAPI(`${HOST_NAME}/auth/login`, 'POST', {
      username: form.auth_username.value,
      password: form.auth_password.value,
    });
    state.token = data.token;
    state.userId = data.userId;
    state.role = data.role;
    state.user.imageUrl = data.userImage;
    state.user.name = data.userName;
    state.factory = data.factory;
    state.agent = data.agent;
    state.serviceCenter = data.serviceCenter;
  } catch (error) {
    throw error;
  }
};

export const getWorkplaceId = function () {
  let id = '';
  switch (state.role) {
    case 'Cơ sở sản xuất':
      id = state.factory;
      break;
    case 'Đại lý phân phối':
      id = state.agent;
      break;
    case 'Trung tâm bảo hành':
      id = state.serviceCenter;
      break;
    default:
      break;
  }
  return id;
};
