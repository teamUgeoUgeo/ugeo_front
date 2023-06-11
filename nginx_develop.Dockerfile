# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx:1.24
# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx-dev.conf /etc/nginx/nginx.conf

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]