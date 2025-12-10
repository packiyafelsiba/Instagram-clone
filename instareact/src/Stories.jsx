import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stories() {
  const[stories,setStories]=useState([]);
const navigate=useNavigate();
let tom=0;

  useEffect(()=>{
    fetch('http://localhost:3000/story').
  then(data=>data.json()).
  then(data=>setStories(data)).
  catch(err=>console.log(err))
},[])

  return (
    <div className="story d-flex">
      <div className='d-none'>
        {tom=stories.length}</div>
      {stories.length>0?(
      stories.map((story)=>(
<div key={story.id} className="mx-1" onClick={()=>{navigate(`/story/${story.id}/${tom}`)}}>
  <div className="gradient-border">
  <img  className="story-dp rounded-circle" src={story.user.profile} alt="dp"/>
</div>
<p className='text-truncate' style={{width:"50px"}}>{story.user.username}</p>
</div>
      ))
    ):(
      <p>Loading</p>
    )}
    </div>
  )
}

export default Stories 