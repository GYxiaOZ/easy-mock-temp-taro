module.exports = {
  // easy-mock 服务器
  host: 'http://192.168.2.11:7300',
  // 生成文件输入目录
  output: 'src/api',
  // 生成代码使用的模板
  template: './',
  // template: 'GYxiaOZ/easy-mock-temp-taro',
  projects: [
    {
      // easy-mock project http://192.168.2.11:7300/project/5c7c941504e77820f451b643
      id: '5c7c941504e77820f451b643',
      name: 'componentRegistry',
      baseUrl: 'process.env.REACT_APP_COMPONENT_REGISTRY_SERVER',
    },
  ],
};
