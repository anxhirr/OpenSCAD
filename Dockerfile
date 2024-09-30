FROM node:20

RUN apt-get update && apt-get install -y \
    wget \
    make \
    unzip \
    zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install node

COPY package*.json ./
COPY yarn.lock ./
COPY . .

RUN yarn install

RUN make public
RUN npm run build:prod

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
