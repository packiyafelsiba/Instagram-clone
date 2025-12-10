import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Posts() {

    const [posts, setPosts]=useState([]);
    const navigate=useNavigate();
    
    useEffect(()=>{
fetch("http://localhost:3000/posts").
then((data)=> data.json()).
then((data=>setPosts(data))).
catch(err=>console.log(err))
    },[] );
      const handleLike = async (postId) => {
    const post = posts.find(p => p.id === postId);

    const updatedPost = {
      ...post,
          isLiked: !post.isLiked, 

    likesCount: post.isLiked 
      ? post.likesCount - 1 
      : post.likesCount + 1
  };


    await axios.put(`http://localhost:3000/posts/${postId}`, updatedPost);

    setPosts(prev =>
      prev.map(p => (p.id === postId ? updatedPost : p))
    );
  };

  return (
    <div className='d-flex justify-content-center'>
{posts.length>0?(
  <div> 
    {posts.map((post)=>(
  <div className="my-3" key={post.id}>
  <div className="d-flex"> 
  <img className=" dp rounded-circle" src={post.user.profile} alt="profile" />
           <h5>{post.user.username}</h5>
           </div>
           <img  className="image"src={post.image} alt="post"/>
           <div>
          <i className={`bi ${post.isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`} 
            onClick={() => handleLike(post.id)}></i>
            <i className="bi bi-chat"></i>
            <i className="bi bi-send" onClick={() => navigate('/share')}>
</i>
            </div>
            <div>

              <b>{post.likesCount}</b>
              </div>
              <p>{post.caption}</p>
  </div>
       

  ))}
  </div>)
:(
<div> Loading Posts</div>
) }
    </div>
  )
}

export default Posts