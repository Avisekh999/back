import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name: 'Jhon Doe',
        email:'jhon@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name: 'Jane Doe',
        email:'jane@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
   
]

export default users