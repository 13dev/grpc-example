import {User, UserRequest} from '@src/proto/user_pb'
import {Empty} from 'google-protobuf/google/protobuf/empty_pb'
import {UsersClient} from '@src/proto/user_grpc_pb'
import {credentials} from 'grpc'

export default class UserService {
    private client: UsersClient

    constructor() {
        this.client = new UsersClient(
            `localhost:3000`,
            credentials.createInsecure(),
        )
    }

    public async all(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            const stream = this.client.getUsers(new Empty())
            const users: User[] = []
            stream.on('data', (user) => users.push(user))
            stream.on('error', reject)
            stream.on('end', () => resolve(users))
        })
    }

    public async create(users: User[]): Promise<void> {
        const stream = this.client.createUser(() => {
        })
        for (const user of users) {
            stream.write(user)
        }
        stream.end()
    }

    public async get(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const request = new UserRequest()
            request.setId(id)

            this.client.getUser(request, (error, user) => {
                if (error) {
                    reject(error)
                    return
                }
                resolve(user)
            })
        })
    }
}
