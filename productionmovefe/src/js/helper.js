export const fetchAPI = async function (url, method, body, token = null) {
  try {
    const option = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      option.headers.Authorization = 'Bearer ' + token;
    }
    if (option.method !== 'GET') {
      option.body = JSON.stringify(body);
    }
    const res = await fetch(url, option);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.status === 500 ? 'Failed to fecth' : data.error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchWithFormData = async function (
  url,
  method,
  formData,
  token = null
) {
  try {
    const option = {
      method: method.toUpperCase(),
      body: formData,
    };
    if (token) {
      option.headers.Authorization = 'Bearer ' + token;
    }
    const res = await fetch(url, option);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.status === 500 ? 'Failed to fecth' : data.error);
    }
  } catch (error) {
    throw error;
  }
};

export const formatDate = function (date) {
  const displayDate = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  const displayTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return {
    displayDate: displayDate,
    displayTime: displayTime,
  };
};
