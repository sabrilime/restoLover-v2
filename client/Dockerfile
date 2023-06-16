FROM node:18.10.0

LABEL version="1.2"
LABEL description="docker image for restolover v2 frontend react app."
LABEL maintainer = ["sabrilioui@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]