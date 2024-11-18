import prisma from "../db/db_config.js"


export const fetchPosts = async (req,res)=>{
    const  posts = await prisma.post.findMany({})

    return res.json({ status: 200, data: posts })
}


export const createPost = async (req, res) => {
    const { user_id, title, description } = req.body

    const newPost = await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title,
            description
        }
    })
    return res.json({ status: 200, data: newPost, msg: "Post created." });
}


// Update Post

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description} = req.body;

    const findPost = await prisma.post.findUnique({
        where: {
            id: Number(postId),
        },
    });

    if (!findPost) {
        return res.status(404).json({
            status: 404,
            message: "Post not found.",
        });
    }

    const updatedPost = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
            title: title || findPost.title,
            description: description || findPost.description,
            
        },
    });

    return res.json({ status: 200, data: updatedPost, msg: "Post updated succesfully." });
}

// * Show Post
export const showPost = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
    });
  
    return res.json({ status: 200, data: post });
  };


  // * Delete Post
export const deletePost = async (req, res) => {
    const postId = req.params.id;
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
  
    return res.json({ status: 200, msg: "Post deleted successfully" });
  };