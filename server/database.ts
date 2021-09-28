import {User, UserStatus} from '@src/proto/user_pb'

export const users = [
    {id: 1, name: 'TEST1', age: 13, status: UserStatus.OFFLINE},
    {id: 2, name: 'TEST2', age: 14, status: UserStatus.OFFLINE},
].map(({id, name, age, status}: User.AsObject) => {
    const user = new User()
    user.setId(id)
    user.setName(name)
    user.setAge(age)
    user.setStatus(status)
    return user
})
