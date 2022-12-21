const uuid = require("uuid");
let users = [];

class UserController {
  getAllUsers(req, res) {
    console.log('ALL USERS');
    res.send(users);
  }
  getOneUser(req, res) {
    const user = users.filter((user) => {
      return user.id === req.params;
    });
    if (!req.params.length) {
      res.send(`No ID was entered`, 404);
    } else if (user.length) {
      res.send(user);
    } else {
      res.send(`Such user do not exists`, 400);
    }
  }
  createUser(req, res) {
    const createdUser = { ...req.body, id: uuid.v1() };
    users.push(createdUser);
    if (!req.body.username || !req.body.age || !req.body.hobbies) {
      res.send(`Request body does not contain required field`, 400);
    } else {
      res.send(createdUser, 201);
    }
  }
  updateUser(req, res) {
    const { body } = req;
    const foundUser = users.filter((user) => {
      return user.id === req.params;
    });
    console.log(`Path`, req.pathname,`Params - `, req.params);
    if (!req.params.length) {
      res.send(`No ID was entered`, 404);
    } else if (foundUser.length) {
      const user = { ...foundUser[0], ...body };
      res.send(user);
    } else {
      res.send(`Such user do not exists`, 400);
    }
  }
  deleteUser(req, res) {
    const foundUser = users.filter((user) => {
      return user.id === req.params;
    });
    if (!req.params.length) {
      res.send(`No ID was entered`, 404);
    } else if (foundUser.length) {
      users = users.filter((user) => user.id !== req.params);
      res.send(foundUser);
    } else {
      res.send(`Such user do not exists`, 400);
    }
  }
}

module.exports = { UserController: new UserController() };
