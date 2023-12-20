FROM golang:1.21 as builder

WORKDIR /backend

COPY ./backend .

RUN go env -w GOPROXY=https://goproxy.cn

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o app main.go

FROM node:21.4-alpine

WORKDIR /

COPY /frontend/public /frontend/public
COPY /frontend/src /frontend/src
COPY /frontend/tsconfig.json /frontend/tsconfig.json
COPY /frontend/package.json /frontend/package.json

COPY --from=builder /backend/app /backend
COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080
EXPOSE 3000

ENTRYPOINT [ "/docker-entrypoint.sh"]