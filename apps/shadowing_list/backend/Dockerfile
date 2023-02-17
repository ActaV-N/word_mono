# Build context /apps/
FROM node:16

WORKDIR /usr/src/app

# Install prisma
RUN npm install -g prisma

# Copy package.json
COPY shadowing_list/backend/package.json ./
COPY shadowing_list/backend/package-lock.json ./
RUN npm install

# Use schema.prisma file in shared folder
COPY shared/database/schema.prisma ./

# Cache all after package installed
COPY shadowing_list/backend ./

RUN prisma generate

EXPOSE 8000
CMD ["npm", "run", "start:dev"]