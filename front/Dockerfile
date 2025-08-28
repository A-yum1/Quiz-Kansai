FROM node:20-alpine
WORKDIR /usr/src/app

# 依存関係だけ先にコピーしてインストール
COPY app/package*.json ./
RUN npm ci

# 残りのコードをコピー
COPY app ./

EXPOSE 3000
CMD ["npm", "run", "dev"]
