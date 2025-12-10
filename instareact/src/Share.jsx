import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Share() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // changed to array

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/followers")
      .then(res => setFollowers(res.data))
      .catch(err => console.log(err));
  }, [postId]);

  const toggleSelectUser = (user) => {
    setSelectedUsers(prev => {
      if (prev.find(u => u.id === user.id)) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSend = () => {
    if (selectedUsers.length === 0) {
      alert("Please select the user");
      return;
    }

axios.post("http://localhost:3000/shared", {
    postId: postId,
    sharedTo: selectedUsers
})
      .then(() => {
    alert("Post is shared!");
    navigate(-1); 
  })
  };

  return (
    <div>  
     {post && (
  <div className="border p-3 mb-3 rounded">
    <h5>Post Preview</h5>
    <img src={post.image} alt="" className="img-fluid rounded" />
    <p className="mt-2">{post.caption}</p>
  </div>)}
    <div className="container mt-4">
      <h4 className="mb-3">Share Post</h4>

      {followers.length === 0 ? (
        <div>No followers to share with.</div>
      ) : (
        <div className="list-group">
          {followers.map(user => (
            <div key={user.id}
              className={"list-group-item d-flex align-items-center" }
              onClick={() => toggleSelectUser(user)}>
            {selectedUsers.find(u => u.id === user.id) && (
                 <i className=" bi bi-check-circle tick"></i>)}

              <div>
                <img
                  src={user.profile} alt="" className="can rounded-circle me-3" />
              </div>
              <div>
                <b>{user.username}</b>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary w-100 mt-4"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
    </div> 
  );
}

export default Share;
