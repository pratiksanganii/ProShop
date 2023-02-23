import bcryptjs from 'bcryptjs'
const users = [
  {
    name: "Admin User",
    email: "admin@ex.com",
    password: bcryptjs.hashSync('admin@123',10),
    isAdmin: true,
  },
  {
    name: "Tushar",
    email: "tushar@ex.com",
    password: bcryptjs.hashSync('tushar@123',10),
  },
  {
    name: "Purvish",
    email: "purvish@ex.com",
    password: bcryptjs.hashSync('purvish@123',10),
  },
];

export default users