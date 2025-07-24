FROM node:22.14.0-slim
EXPOSE 4000
COPY package.json package-lock.json /
ADD app /app
RUN npm ci
CMD ["npm", "start"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
