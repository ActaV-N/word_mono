FROM postgres:latest

# Install prisma
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g prisma

# Set environment variable
ENV DATABASE_URL={DATABASE_URL}

# Copy schema.prisma.
COPY schema.prisma ./