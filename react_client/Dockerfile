FROM node:16
# Create app directory
WORKDIR /react_client
COPY package.json .
# Install project dependencies
RUN npm install

COPY . .

EXPOSE 3000
# Run default command
CMD ["npm", "start"]