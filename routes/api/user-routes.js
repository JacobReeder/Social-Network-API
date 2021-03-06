const router = require('express').Router();

 const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  postFriend,
  deleteFriend
} = require('../../controllers/user-controller');
 

// Set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

  /**
   * // example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
   */

// Set up GET one, PUT, and DELETE at /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


 ///friends 
router
 .route('/:id/friends/:friendId')
 .post(postFriend) // to add a new friend to a user's friend list
 .delete(deleteFriend) // to remove a friend from a user's friend list*/

module.exports = router;