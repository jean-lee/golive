;(function(name, definition, context){
  if ((typeof module !== 'undefined') && module.exports)
    module.exports = definition() // node 环境
  else if ((typeof context['define'] === 'function') && (context['define']['amd'] || context['define']['cmd']))
    define(definition)            // amd cmd 规范环境，如 seajs requirejs
  else
    context[name] = definition()  // 浏览器环境
})('MAIN_CONFIG', function () {

  // API
  var API_ROOT = 'http://10.10.10.111:8024/api/';
  // const API_ROOT = 'http://10.10.13.76/api/';

  // STATIC
  const STATIC_RESOURCE_ROOT = 'http://10.10.10.111:8024/';

  // window.comment_danmu = new CommentManager();
  return {
    
  }
}, this);