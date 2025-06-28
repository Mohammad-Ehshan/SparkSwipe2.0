import express from 'express';
import { deleteProject, getAllProjects, getLikedProjects, getMyProjects, getPostedProjects, getSavedProjects, getSearchProjects, getSingleProject, getTrendingProjects, postProject, updateMonthlyTrending, updateProject } from '../controllers/projectController.js';
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.get("/getall",getAllProjects);
router.post("/post",isAuthenticated,postProject);
router.get("/myprojects",isAuthenticated,getMyProjects);
router.put("/update/:id",isAuthenticated,updateProject); 
router.delete("/delete/:id",isAuthenticated,deleteProject); 

// I have moved these BEFORE the dynamic `/:id` route
router.get('/posted', isAuthenticated, getPostedProjects);
router.get('/liked', isAuthenticated, getLikedProjects);
router.get('/saved', isAuthenticated, getSavedProjects);
router.get("/trending",getTrendingProjects)
router.get('/update-trending', async (req, res) => {
  await updateMonthlyTrending('monthly');
  res.send('Trending data updated!');
});
router.get("/search",getSearchProjects)

//  I have place this LAST to avoid overriding others
router.get("/:id",isAuthenticated,getSingleProject); 

export default router;
