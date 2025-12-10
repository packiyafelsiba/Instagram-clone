import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
function ViewStory() {
  const{id,tom}=useParams();
  const[story, setStory]=useState(null);
const navigate=useNavigate();
  useEffect(()=>{
fetch(`http://localhost:3000/story/${id}`)
  .then(data=>data.json())
  .then(data=>setStory(data))
  .catch(err=>console.log(err))
},[id]);

if(id>tom || id<=0){
  navigate('/');
}


    return (
    <div>{story? 
     
     <div className="d-flex justify-content-center align-items-center">
<Link to={`/story/${Number(id)-1}/${tom}`}><i class="bi bi-arrow-left-circle-fill"></i></Link>

<img  className="vh-100 "src={story.image} alt="story"/>
  <Link to={`/story/${Number(id)+1}/${tom}`}><i class="bi bi-arrow-right-circle-fill"></i>
</Link>     
        </div>:<div>Loading</div>}
      </div>
  )
}

export default ViewStory