FROM node:20
WORKDIR /usr/src/app/server
COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 8000
CMD ["npm", "run", "watch"]