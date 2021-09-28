require('module-alias/register')
import UserService from '@src/client/user-service'
import {User, UserStatus} from '@src/proto/user_pb'

(async () => {
    const userService = new UserService()
    console.log(await userService.get(1))


    const user = new User()
    user.setId(1)
    user.setAge(10)
    user.setName('Leo')
    user.setStatus(UserStatus.AVAILABLE)

    await userService.create([user])
    console.log(`User Created \n`)

    const users = await userService.all()
    console.log(`List ${users.length} users.`)

    for (const user of users) {
        console.log(user.toString())
    }
})()
