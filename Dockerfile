FROM registry-vpc.cn-beijing.aliyuncs.com/wutong-library/node:8.16.2-stretch-slim as builder

RUN npm install yarn -g && yarn config set registry https://registry.npm.taobao.org/ 
ADD package.json /code/
ADD package-lock.json /code/
ADD yarn.lock   /code/

RUN cd /code && yarn config get registry && yarn install 
ADD . /code 

RUN cd /code && ls -la  &&  yarn dist

FROM registry-vpc.cn-beijing.aliyuncs.com/wutong-library/nginx:1.19.0
COPY --from=builder /code/web /site/web
ADD nginx.config /etc/nginx/conf.d/site.conf
