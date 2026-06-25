import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  const handleClick = async () => {
    let data = await axios.post("http://localhost:5000/todo", {
      task: task,
      priority: priority,
    });
    setInfo(data.data);

    let allData = await axios.get("http://localhost:5000/allTodosGet");
    setData(allData.data.data);
    task = ""
  };
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  const handleOptionChange = (e) => {
    setPriority(e.target.value);
  };
  useEffect(() => {
    async function allDatas() {
      let allData = await axios.get("http://localhost:5000/allTodosGet");
      setData(allData.data.data);
    }
    allDatas();
  }, []);
  return (
    <>
      <h3>Todo</h3>
      {info.success ? (
        <p>{info.message}</p>
      ) : (
        <p style={{ color: "red" }}>{info.message}</p>
      )}
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="Add your task"
      />
      <select onChange={handleOptionChange}>
        <option value="low">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleClick}>Add Task</button>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.task} == {item.priority} == {item.status}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
