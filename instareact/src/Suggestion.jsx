import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestion() {
    const [profiles,setProfiles]=useState(null);
const [Suggestions,setSuggestions]=useState([]);
useEffect(()=>{
    fetch('http://localhost:3000/Profiles').
then(data=>data.json()).
then(data=>setProfiles(data[0])).
catch(err=>console.log(err))

  fetch('http://localhost:3000/suggestion').
then(data=>data.json()).
then(data=>setSuggestions(data)).
catch(err=>console.log(err))

},[])
const handleFollow=async (id,username,profile)=>{
    const existing = await fetch(`http://localhost:3000/followers?id=${id}`)
    .then(res => res.json());

  if (existing.length > 0) {
    alert("Already Followed");
    return; 
  }

axios.post('http://localhost:3000/followers',{"id":id,"username":username,"profile":profile})
.then(alert('followed'))
.catch(err=> console.log(err))
}


  return (
    <div>
        <div className="suggest m-4">
        {profiles ?
         <div className="d-flex"> 
  <img className=" dp rounded-circle" src={profiles.profile} alt="profile" />
           <h5>{profiles.username}</h5>
           <small className='ms-auto text-primary'>Switch</small>
           </div>
           :<p>Loading</p>}
           <div className='d-flex'>
            <p>Suggestion for you</p>
            <b className='ms-auto'>See All</b>
           </div>
           {Suggestions.length>0?(
  <div> 
    {Suggestions.map((suggestion)=>(
  <div  key={suggestion.id}>
  <div className="d-flex"> 
  <img className=" dp rounded-circle" src={suggestion.profile} alt="profile" />
           <h5>{suggestion.username}</h5>
           <a className='text-primary ms-auto' onClick={()=>handleFollow(suggestion.id,suggestion.username,suggestion.profile)}>Follow</a>
           </div>
  </div>
  ))}
  </div>)
:(
<div> Loading Posts</div>
) }

           </div>
</div>
  )
}

export default Suggestion