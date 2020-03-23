import Taro from '@tarojs/taro';
import keys from 'lodash/keys';
import get from 'lodash/get';
import StorageType from '@/enums/storageType';
import { replaceTo, Pages } from '@/utils/router';
import { WithPathOpts } from './Opts.d';

export function convertRESTAPI(url: string, opts: WithPathOpts) {
  if (!opts || !opts.path) return url;

  const pathKeys = keys(opts.path);

  pathKeys.forEach(key => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

type Conf = {
  method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined;
  url: string;
  opts?: {
    path?: object;
    data?: object;
  };
};

let timer: any = null;

export default function request(conf: Conf): Promise<any> {
  const token = Taro.getStorageSync(StorageType.AUTHORIZATION);
  return new Promise((resolve, reject) => {
    Taro.request({
      url: conf.url,
      data: conf.opts && conf.opts.data,
      method: conf.method,
      header: {
        'content-type': 'application/json',
        'Cache-Control': 'max-age=60', //60秒
        Authorization: token,
      },
    })
      .then(data => {
        if (data.statusCode === 200) {
          resolve(data);
        } else if (
          !get(conf, 'opts.interceptorIgnore') &&
          (data.statusCode === 401 || data.statusCode === 403)
        ) {
          reject({ errMsg: (data.data && data.data.msg) || '需要登录才能完成操作' });
          if (!timer) {
            timer = setTimeout(() => {
              clearTimeout(timer);
              timer = null;
              replaceTo(Pages.LOGIN);
            }, 1500);
          }
        } else {
          reject({ errMsg: data.data && data.data.msg });
        }
      })
      .catch(e => {
        reject(e);
      });
  });
}
