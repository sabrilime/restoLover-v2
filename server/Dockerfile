FROM node:18.10.0

LABEL version="1.2"
LABEL description="docker image for restolover-v2 app backend API"
LABEL maintainer = ["sabrilioui@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
ENV PATH=/home/node/node_modules/.bin:$PATH
COPY . .

EXPOSE 8000

CMD ["npm", "start"]