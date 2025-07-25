  import express from "express";
  import jwt from "jsonwebtoken";
  import mongoose from "mongoose";
   import { connectDB,User,Content,Link } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import {random} from"./utils"
import cors from "cors"; 

   const PORT = 3000;
  const app = express();
  app.use(express.json());
  app.use(cors());

  connectDB();
 
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });


  app.post("/api/v1/signup", async (req,res) => {
             
            const username = req.body.username;
            const password = req.body.password;

            try { 

                 await User.create({
                      username: username,
                      password: password
                 })

                 res.json({
                     message: "User signed up"
                 })
                                 
            } catch (error) {
                  res.status(411).json({
                      message: "User already exists"
                  })
            }
  })

 app.post("/api/v1/signin", async(req,res) => {
                            
               const username = req.body.username;
               const password = req.body.password;

               try {
                        const user = await User.findOne({
                              username:username,
                              password:password
                        })       
                         
                       if(user){
                             
                           const token = jwt.sign({id: user._id}, JWT_SECRET);

                           res.json({
                            token,
                           });
                       } 


               } catch (error) {
                res.status(403).json({
                    message: "Incorrrect credentials"
                })
               }
 })

 app.post("/api/v1/content",userMiddleware ,async(req,res) =>{
                    
          const link = req.body.link;
          const type = req.body.type;
          await Content.create({
               link,
               type,
               title: req.body.title,
               //@ts-ignore
               userId: req.userId,
               tags: []
          })

           res.json({
               message: "Content added"
           })
 })

 app.get("/api/v1/content",userMiddleware ,async(req,res) => {
              
          //@ts-ignore
          const userId = req.userId;

            const  content = await Content.find({
              userId:userId
           }).populate("userId","username")
                 res.json({
                 content
            }) 

        })

           

 app.delete("/api/v1/content", userMiddleware ,async(req,res) => {
   
    const {contentId} = req.body;
      //@ts-ignore
    console.log("Deleting content with ID:", contentId, "for user:", req.userId);



    await Content.deleteMany({
          _id: contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
 })

// app.post("/api/v1/brain/share", userMiddleware,async(req,res)=>{
//             const share = req.body.share;
//             if(share) {
                 
//                 const existingLink = await Link.findOne({
//                    //@ts-ignore     
//                   userId: req.userId
//                 })
                   
//                    if(existingLink){
//                          res.json({
//                    //@ts-ignore     
                              
//                           hash: exsistingLink.hash
//                          })
//                          return;
//                    }
                 
//                   const hash = random(10);
//                   await Link.create({
//                           //@ts-ignore
//                          userId: req.userId,
//                          hash
//                   })
//             } else{
//                await Link.deleteOne({
                 
//                  //@ts-ignore
//                     userId: req.userId
//                });

//                res.json({
//                    //@ts-ignore     
                  
//                 hash
//                })
//             }

          

                
// })

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await Link.findOne({
      // @ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        // @ts-ignore
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);
    await Link.create({
      // @ts-ignore
      userId: req.userId,
      hash,
    });

    res.json({
      hash,
    });
  } else {
    await Link.deleteOne({
      // @ts-ignore
      userId: req.userId,
    });

    res.json({
      message: "Shareable link deleted",
    }); // ✅ sends confirmation after deletion
  }
});






  app.get("/api/v1/brain/:shareLink", async (req,res)=>{
             
             const hash = req.params.shareLink;

             const link = await Link.findOne({
                         hash
             });

             if (!link){
                    res.status(411).json({
                         message: "Sorry incorrect input"
                    })
                    return;
             }

             const content = await Content.find({
                              //@ts-ignore
                        userId: link.userId,
             })
              
             const user = await User.findOne({
                       //@ts-ignore
                     _id: link.userId
             })


                if(!user){
                   res.status(411).json({
                     message: "user not found, error should ideally not happen"
                      })
                    return;
                }

             res.json({
                   username: user.username,
                   content: content
             })
  })


function customCors(): any {
  throw new Error("Function not implemented.");
}
  