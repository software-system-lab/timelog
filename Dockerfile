FROM node:10.16.3

ADD . /app
WORKDIR /app

# Specify node host
RUN cat "104.16.27.35 registry.npmjs.org" >> /etc/hosts

# Install node modules
RUN npm install

# Build static
RUN npm run build

# Run node server
RUN ls -al .
CMD ["node", "server.js"]
