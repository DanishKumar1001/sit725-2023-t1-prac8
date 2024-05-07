from node:16-alpine
WORKDIR /app
COPY . .
EXPOSE 8000
RUN npm install
CMD ["npm","start"]
