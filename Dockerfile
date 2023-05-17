################### Stage 1: Build ###################
FROM node:20-slim as BUILD_STAGE

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy files into app directory (see .dockerignore)
COPY . /usr/src/app

# Install dependencies (replace with npm install, if you cannot provide a package-lock)
RUN npm ci

# Create build
RUN npm run production:build

# Remove all packages except production
RUN npm prune --production

################### Stage 2: Production ###################
FROM node:20-slim as PRODUCTION_STAGE

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy project configuration files required to run
COPY ./package.json ./tsconfig.json ./tsconfig.production.json ./

# Copy dist from previous stage
COPY --from=BUILD_STAGE usr/src/app/dist ./dist/

# Copy node_modules from previous stage
COPY --from=BUILD_STAGE usr/src/app/node_modules ./node_modules/

EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/npm", "run", "production:start"]
