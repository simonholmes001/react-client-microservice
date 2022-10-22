FROM node:16
# Create app directory
WORKDIR /backend
COPY package.json .
# Install project dependencies
RUN npm install

COPY . .

EXPOSE 8000
# Run default command
CMD ["npm", "start"]