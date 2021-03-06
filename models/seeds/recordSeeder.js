// require
const Record = require("../record")
const User = require("../user")
const Category = require("../category")

const bcrypt = require("bcryptjs")
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')


db.once("open", () => {
  const userIds = Array.from({ length: 2 }, (v, i) => i);

  return Category.find({})
    .then(categories => {
      return Promise.all(
        userIds.map(uId =>
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash("12345678", salt))
            .then(hash =>
              User.create({
                name: `user${uId + 1}`,
                email: `user${uId + 1}@example.com`,
                password: hash
              })
            )
            .then(user => {
              const userId = user._id;
              const recordIds = Array.from({ length: 10 }, (v, i) => i);

              return Promise.all(
                categories.map(cId => {
                  const categoryId = cId._id
                  const categoryName = cId.name
                  return Promise.all(
                    recordIds.map(rId => {
                      return Record.create({
                        name: `${categoryName}${rId + 1}`,
                        date: `${1991 - 06 - 01 + rId}`,
                        amount: `${1000 + rId + 1}`,
                        description: `item${rId + 1}`,
                        userId: userId,
                        categoryId: categoryId
                      });
                    })
                  )
                })
              );
            })
        )
      );
    })
    .finally(() => process.exit());
});