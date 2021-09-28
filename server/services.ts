import {
    ServerUnaryCall,
    sendUnaryData,
    ServiceError,
    ServerWritableStream,
    ServerReadableStream,
} from 'grpc'
import {Empty} from 'google-protobuf/google/protobuf/empty_pb'

import {IUsersServer} from '@src/proto/user_grpc_pb'
import {User, UserRequest} from '@src/proto/user_pb'
import {users} from '@src/server/database'

export class UsersServer implements IUsersServer {
    getUser(call: ServerUnaryCall<UserRequest>, callback: sendUnaryData<User>) {
        const userId = call.request.getId()
        const user = users.find((u) => u.getId() === userId)

        if (!user) {
            callback({
                name: 'User not found',
                message: `User ${userId} not exist.`,
            }, null)
            return
        }

        console.log(`GetUser: ${user.getName()} (id: ${user.getId()}).`)
        callback(null, user)
    }

    getUsers(call: ServerWritableStream<Empty>) {
        console.log(`GetUsers: streaming all users.`)
        for (const user of users) call.write(user)
        call.end()
    }

    createUser(
        call: ServerReadableStream<Empty>,
        callback: sendUnaryData<Empty>,
    ) {
        console.log(`Create users using stream.`)

        let userCount = 0

        call.on('data', (user) => {
            userCount++
            users.push(user)
        })

        call.on('end', () => {
            console.log(`Created ${userCount} new users.`)
            callback(null, new Empty())
        })
    }
}
