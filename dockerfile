FROM node:20 
COPY . .
RUN npm install

CMD ["npm", "run", "dev"]
