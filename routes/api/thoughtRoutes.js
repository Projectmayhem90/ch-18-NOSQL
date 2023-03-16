//ThoughtRoutes

const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// Routes for thoughts
router.route('/')
  .get(getThoughts)   
  .post(createThought); 

// Routes for a single thought
router
  .route('/:thoughtId')  
  .get(getSingleThought) 
  .put(updateThought)   
  .delete(deleteThought);   

// Routes for reactions to a thought
router.route('/:thoughtId/reactions')
  .post(createReaction);  

// Routes for a single reaction to a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);  

module.exports = router;
