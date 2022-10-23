FROM node:16
# Create app directory
WORKDIR /backend
COPY ./backend /backend
# Install project dependencies
RUN npm install

EXPOSE 8000
# Run default command
CMD ["npm", "start"]