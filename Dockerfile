FROM node

COPY server/ /

CMD ["node", "server/server.js"]