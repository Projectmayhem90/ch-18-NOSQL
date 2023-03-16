const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('friends');

      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('friends');

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true, runValidators: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
