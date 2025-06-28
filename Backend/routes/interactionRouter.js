import express from 'express';
import { 
  addComment,
  likeComment,
  reportProject,
  bookmarkProject,
  getComments,
  getReplies
} from '../controllers/interactionController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/comments', isAuthenticated, addComment);
router.get("/comments/:projectId", getComments);
router.get("/comments/replies/:commentId",getReplies);
router.post('/comments/like', isAuthenticated, likeComment);
router.post('/reports', isAuthenticated, reportProject);
router.post('/bookmarks', isAuthenticated, bookmarkProject);

export default router;