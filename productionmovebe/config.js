exports.DB_URL =
  'mongodb+srv://thang-1:khongcopass@cluster0.nuncdza.mongodb.net/productionMove?retryWrites=true';

exports.PRODUCT_STATUS = {
  newProduct: 'Mới sản xuất',
  inAgent: 'Về đại lý',
  sold: 'Đã bán',
  needWarranty: 'Lỗi, cần bảo hành',
  inWarranty: 'Đang sửa chữa',
  doneWarranty: 'Đã bảo hành xong',
  backToCustomer: 'Đã trả lại khách',
  needBackToFactory: 'Lỗi, cần đưa về nhà máy',
  backTofactory: 'Lỗi, đã đưa về nhà máy',
  needSummoned: 'Lỗi, cần được triệu hồi',
  warrantyExpired: 'Hết thời gian bảo hành',
  returnFactory: 'Trả lại nhà máy',
};

exports.USER_STATUS = {
  active: 'Kích hoạt',
  forgotPW: 'Quên mật khẩu',
};

exports.STATUS_CODE = {
  ok: 200,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
  serviceUnavailable: 503,
};

exports.SECRET_KEY = 'nguoitrongcachua';

exports.PER_PAGE = 8;

exports.HOST_NAME = 'http://localhost:8080';
