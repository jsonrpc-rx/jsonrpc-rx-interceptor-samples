import { Interceptor, JsonrpcEnd, JsonrpcResponseBody, MessageType } from '@jsonrpc-rx/server';
import * as log4js from 'log4js';

log4js.configure({
  appenders: { jsonrpcRx: { type: 'dateFile', filename: 'log/jsonrpc-rx.log', pattern: '-yyyy-MM-dd' } },
  categories: { default: { appenders: ['jsonrpcRx'], level: 'info' } },
});

const logger = log4js.getLogger('jsonrpcRx');

export const logInterceptor: Interceptor = (envInfo) => {
  const { end, type } = envInfo; // end -- 拦截器运行在哪一端: 'server' | 'client', type -- 拦截器类型：'request' | 'response'

  switch (end + type) {
    case JsonrpcEnd.Server + MessageType.Request:
      return (messageBody) => {
        logger.info(JSON.stringify(messageBody));
        return messageBody;
      };
    case JsonrpcEnd.Server + MessageType.Response:
      return (messageBody) => {
        if ((messageBody as JsonrpcResponseBody).error) {
          logger.error(JSON.stringify(messageBody));
        } else {
          logger.info(JSON.stringify(messageBody));
        }
        return messageBody;
      };
  }
};

// =========================== jsonrpc-rx 插件开发的模板 ======================================
//export const someInterceptor: Interceptor = (envInfo) => {
//  // end -- 拦截器运行在哪一端: 'server' | 'client', type -- 拦截器类型：'request' | 'response'
//  const { end, type } = envInfo
//
//  switch (end + type) {
//    case JsonrpcEnd.Client + MessageType.Request:
//      return (messageBody) => {
//        // 在发送请求之前做些什么
//        return messageBody
//      }
//    case JsonrpcEnd.Client + MessageType.Response:
//      return (messageBody) => {
//        // 抛出错误
//        return new Error("some error")
//      }
//    case JsonrpcEnd.Server + MessageType.Request:
//      return (messageBody) => {
//        // 返回 undefined, 中断信息的传递
//        return undefined
//      }
//    case JsonrpcEnd.Server + MessageType.Response:
//      return (messageBody) => {...}
//  }
//}
