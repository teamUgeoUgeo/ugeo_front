# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx:1.24

# root 에 app 폴더를 생성
RUN mkdir -p /app/out

# work dir 고정
WORKDIR /app

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
COPY dist /app/out

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /nginx.conf.template

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["/bin/sh" , "-c" , "envsubst '$BACKEND_URL' < /nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
