import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Profiles() {
    const [profiles,setProfile]=useState(null);
    const [followers,setFollowers]=useState([]);
    const[Unfollowed,setUnfollowed]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/Profiles')
        .then(data=> setProfile(data.data[0]))
        .catch(err=>console.log(err))

         axios.get('http://localhost:3000/followers')
        .then(data=>setFollowers(data.data))
        .catch(err=>console.log(err))

      },[Unfollowed])
    function HandleOnChange(e)
    {
     setProfile(prev =>({
      ...prev,
     [e.target.name]:e.target.value
}))
    }
    const handleUpdate=async ()=>{
      axios.put(`http://localhost:3000/Profiles/${profiles.id}`, profiles)
      .then(console.log("updated"))
      .catch(err=>console.log(err))
    }
    const handleUnFollow =async(id)=>{
            axios.delete(`http://localhost:3000/followers/${id}`)
           .then (alert("Unfollowed"))
           .then(setUnfollowed(!Unfollowed))
            .catch(err=>console.log(err))
    }
  return (
    <div className='m-5'>
      {profiles ?(
        <div>
            <img src={profiles.profile} className="profile rounded-circle" alt=""/>
        <h5>{profiles.username}</h5>
        <input type="text"
        value={profiles.username}
        name="username"
        className='form-control my-4'
        onChange={HandleOnChange}
        />
                <input type="text"
        value={profiles.profile}
        name="profile"
        className='form-control'
         onChange={HandleOnChange}

        />
<button className='btn btn-primary my-4' onClick={handleUpdate}>Update</button>
        </div>
    ):(<div>Loading Profile</div>)}

    {followers.length>0?(
      followers.map(follower=>(
     <div key={follower.id} className='d-flex my-2'>
        <img className=" dp rounded-circle" src={follower.profile} alt="profile" />
<h5>     {follower.username}
</h5>     
<button className='btn btn-secondary ms-auto' onClick={()=>handleUnFollow(follower.id)}>UnFollow</button>
</div>
      ))
    ):(
      <div>Loading Followers</div>
    )}
    </div>
  )
}

export default Profiles