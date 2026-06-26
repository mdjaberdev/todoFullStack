import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [status, setStatus] = useState("");
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  let [isUpdate, setisUpdate] = useState(false)
  let [id, setId] = useState('')
  const handleClick = async () => {
    let data = await axios.post("http://localhost:5000/todo", {
      task: task,
      priority: priority,
      status: status
    });
    setInfo(data.data);

    let allData = await axios.get("http://localhost:5000/allTodosGet");
    setData(allData.data.data);
    setTask('')
    setPriority('')
    setStatus('')
  };
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  const handleOptionChange = (e) => {
    setPriority(e.target.value);
  };
  const handleStatusChange = (e)=>{
    setStatus(e.target.value)
  }

  useEffect(() => {
    async function allDatas() {
      let allData = await axios.get("http://localhost:5000/allTodosGet");
      setData(allData.data.data);
    }
    allDatas();
  }, []);

  let handleDelete = async (id) => {
    let deleteData = await axios.delete(
      `http://localhost:5000/deleteTodos/${id}`,
    );
    console.log(deleteData);
    let allData = await axios.get("http://localhost:5000/allTodosGet");
    setData(allData.data.data);
  };
  let handleEdit = (item)=>{
    setTask(item.task)
    setPriority(item.priority)
    setStatus(item.status)
    setisUpdate(true)
    setId(item._id);
  }
  let handleUpdate = async  ()=>{
  let updateData = await axios.post(`http://localhost:5000/updateTask/${id}`, {
    task: task,
    priority: priority,
    status: status,
  });
  console.log(updateData);
  
  let allData = await axios.get("http://localhost:5000/allTodosGet");
  setData(allData.data.data);
    setTask("");
    setPriority("");
    setstatus('')
  }
  return (
    <>
      <h3>Todo</h3>
      {info.success ? (
        <p></p>
      ) : (
        <p style={{ color: "red" }}>{info.message}</p>
      )}
      <input
        value={task}
        onChange={handleInputChange}
        type="text"
        placeholder="Add your task"
      />
      <select onChange={handleOptionChange} value={priority}>
        <option>Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select onChange={handleStatusChange} value={status}>
        <option>Select Status</option>
        <option value="pending">Pending</option>
        <option value="active">Active</option>
        <option value="block">Block</option>
      </select>
      {isUpdate ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleClick}>Add Task</button>
      )}
      <ul>
        {data.map((item) => (
          <>
            <li key={item._id}>
              {item.task} == {item.priority} == {item.status}
            </li>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
