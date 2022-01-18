import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => fetchRooms(), []);
  const fetchRooms = async () => {
    try {
      const resp = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(resp.data);
    } catch (error) {}
  };

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const resp = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );

      console.log(resp.data);
    } catch (error) {}
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      const resp = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
    } catch (error) {}
  };
  const updateRoom = async (room) => {
    try {
      const resp = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${room.Id}`
      );
      let updateRoom = rooms.map((e) => (e.id === room.id ? resp.data : e));
    } catch (error) {}
  };
}

return (
  <div className="__main">
    <div className="main__chatbody">
      <Switch>
        <Route path="/room/:roomSlug">
          <ChatRoom rooms={rooms} />
        </Route>
        <Route exact path="/">
          <center>
            <ChatRoomsList rooms={rooms} />
          </center>
        </Route>
      </Switch>
    </div>
  </div>
);

export default App;
