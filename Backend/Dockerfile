# FROM node:20.9.0

# USER node

# #run the command as node user
# RUN mkdir /home/node/code 

# # if no mkdir, . is owned by root
# # so cannot add node modules to .
# WORKDIR /home/node/code

# # cowpy entire files
# COPY --chown=node:node . .

# # uses package lock instead of package.json
# RUN npm ci

# RUN npm run build

# CMD [ "node", "dist/index.js" ]



# v2
# problem: if i change any of files, without chaning any modules, 
# then npm i is rerun again, as the files change, so copy . . and npm ci is run
# the steps before it are cached,
# so in order to leverage caching of node modules, we first npm ci and then copy files
# by doing so if the files chanages (without making changes to package, package lock) 
# it's faster then previous method

# FROM node:20

# USER node

# #run the command as node user
# RUN mkdir /home/node/code 

# # if no mkdir, . is owned by root
# # so cannot add node modules to .
# WORKDIR /home/node/code

# # copy package and package lock

# COPY --chown=node:node package-lock.json package.json ./

# # uses package lock instead of package.json
# RUN npm ci

# # copy entire files 
# COPY --chown=node:node . .

# RUN npm run build

# CMD [ "node", "dist/index.js" ]


# build
# docker build --tag task_manager_backend .


#run 
# docker run --name task_manager_backend_instance_name --init --rm --env-file path-to-env-file --publish host_port:container_port task_manager_backend 


#v3
# new method 
#build in one container, transfer built files in another, save space

# build stage
FROM node:20 AS buildStage

WORKDIR /build

COPY package-lock.json package.json ./

# uses package lock instead of package.json
RUN npm ci

COPY . .

RUN npm run build
#runtime stage

FROM node:20-alpine

RUN mkdir /home/code

COPY --from=buildStage /build/dist ./dist
COPY --from=buildStage /build/package.json ./
COPY --from=buildStage /build/package-lock.json ./

RUN npm ci --only=production 

CMD [ "node", "dist/index.js" ]

