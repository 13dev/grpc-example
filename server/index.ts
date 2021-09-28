require('module-alias/register')

import {Server, ServerCredentials} from 'grpc'
import {UsersService} from '@src/proto/user_grpc_pb'
import {UsersServer} from '@src/server/services'

const server = new Server()
server.addService(UsersService, new UsersServer())

console.log(`Listening on localhost:3000`)
server.bind(`localhost:3000`, ServerCredentials.createInsecure())

server.start()
