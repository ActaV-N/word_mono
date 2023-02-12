# Build context /apps/
FROM node:16

WORKDIR /usr/src/app

# Install prisma
RUN npm install -g prisma

# Copy package.json
COPY shadowing_list/backend/package.json ./
RUN npm install

# Cache all after package installed
COPY shadowing_list/backend ./

# Use schema.prisma file in shared folder
COPY shared/database/schema.prisma .

RUN prisma generate

EXPOSE 8000
CMD ["npm", "start"]