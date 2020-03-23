function isFunction(f) {
  return typeof f === 'function';
}

var urlPreprocess = (exports.urlPreprocess = function(url, urlPreprocessor) {
  return urlPreprocessor && isFunction(urlPreprocessor) ? urlPreprocessor(url) : url;
});

var convertUrl = (exports.convertUrl = function(url, urlPreprocessor) {
  // /restful/:id/:list/{id} -> restful_id_list_id
  // /restful/:id/:list/{id}.json -> restful_id_list_id_json
  return urlPreprocess(url, urlPreprocessor)
    .replace(/:|{|}/g, '')
    .replace(/-|!|\./g, '_')
    .split('/')
    .filter(value => !!value)
    .join('_');
});

exports.convertMethod = function(mock, urlPreprocessor) {
  // 防止重名
  // restful_id_list_id => restful_id_list_id_g
  // or
  // restful_id_list_id => restful_id_list_id_p
  return convertUrl(mock.url, urlPreprocessor) + '_' + mock.method.toLowerCase();
};

exports.joinUrl = function() {
  // https://www.easy-mock.com//mock/.... => https://www.easy-mock.com/mock/....
  var url = [].slice.call(arguments, 0).join('/');
  url = url.replace(/:\//g, '://');
  url = url.replace(/([^:\s\%\3\A])\/+/g, '$1/');
  return url;
};

exports.isREST = function(url) {
  return /(:|{|})/.test(url);
};

exports.toUpperCase = function(str) {
  return str.toUpperCase();
};
