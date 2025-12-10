import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/followers")
      .then(data => setUsers(data.data));
  }, []);

  const filteredUsers = text.trim()===""
  ?[]
  :users.filter(u =>
    u.username.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <div className="container mt-3">

      <div className=" search search-box d-flex align-items-center p-2 ">
        
        <i className=" sear bi bi-search" ></i>

        <input
          type="text"
          placeholder="Search"
          className="form-control border-0 bg-transparent"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="list-group">
        {filteredUsers.map(user => (
          <div key={user.id} className="list-group-item d-flex align-items-center">
            <img src={user.profile} width={40}  height={40}  alt="" className="rounded-circle me-3" />
            <b>{user.username}</b>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Search;
