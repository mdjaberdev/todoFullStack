import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "./App.css";

interface TodoItem {
  _id: string;
  task: string;
  priority: string;
  status: string;
  createdAt: string;
}
interface InfoSate {
  success?: boolean;
  message?: string;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [info, setInfo] = useState<InfoSate>({});
  const [data, setData] = useState<TodoItem[]>([]);
  const [isUpdate, setisUpdate] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleClick = async () => {
    const data = await axios.post<InfoSate>("http://localhost:5000/todo", {
      task: task,
      priority: priority,
      status: status,
    });
    setInfo(data.data);

    const allData = await axios.get<{ data: TodoItem[] }>(
      "http://localhost:5000/allTodosGet",
    );
    setData(allData.data.data);
    setTask("");
    setPriority("");
    setStatus("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    async function allDatas() {
      const allData = await axios.get<{ data: TodoItem[] }>(
        "http://localhost:5000/allTodosGet",
      );
      setData(allData.data.data);
    }
    allDatas();
  }, []);

  let handleDelete = async (id: string) => {
    const deleteData = await axios.delete(
      `http://localhost:5000/deleteTodos/${id}`,
    );
    console.log(deleteData);
    const allData = await axios.get<{ data: TodoItem[] }>(
      "http://localhost:5000/allTodosGet",
    );
    setData(allData.data.data);
  };

  const handleEdit = (item: TodoItem) => {
    setTask(item.task);
    setPriority(item.priority);
    setStatus(item.status);
    setisUpdate(true);
    setId(item._id);
  };

  const handleUpdate = async () => {
    const updateData = await axios.post<{ data: TodoItem[] }>(
      `http://localhost:5000/updateTask/${id}`,
      {
        task: task,
        priority: priority,
        status: status,
      },
    );
    console.log(updateData);

    const allData = await axios.get<{ data: TodoItem[] }>(
      "http://localhost:5000/allTodosGet",
    );
    setData(allData.data.data);
    setisUpdate(false);
    setTask("");
    setPriority("");
    setStatus("");
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 antialiased w-full">
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-500 bg-clip-text text-transparent mb-6 text-center sm:text-left">
            Todo
          </h3>

          {info.success ? (
            <p></p>
          ) : (
            <p className="mb-4 p-3  text-red-400 text-sm rounded-lg">
              {info.message}
            </p>
          )}

          {/* Inputs and Buttons Controls Container */}
          <div className="flex flex-col gap-3 sm:flex-row mb-8">
            <input
              value={task}
              onChange={handleInputChange}
              type="text"
              placeholder="Add your task"
              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 text-slate-100 placeholder-slate-500 transition-colors"
            />

            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
              <select
                onChange={handleOptionChange}
                value={priority}
                className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 text-slate-300 text-sm cursor-pointer"
              >
                <option>Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select
                onChange={handleStatusChange}
                value={status}
                className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500 text-slate-300 text-sm cursor-pointer"
              >
                <option>Select Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="block">Block</option>
              </select>
            </div>

            {isUpdate ? (
              <button
                onClick={handleUpdate}
                className="w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-orange-500/20 whitespace-nowrap"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleClick}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                Add Task
              </button>
            )}
          </div>

          {/* Todo List */}
          <ul className="space-y-3">
            {data.map((item) => (
              <div
                key={item._id}
                className="flex flex-col p-4 bg-slate-800/50 border border-slate-800 hover:border-slate-700/80 rounded-xl gap-3 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <li className="list-none text-slate-200 font-medium break-all flex flex-col gap-1">
                    <span>{item.task}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      Priority:{" "}
                      <span className="text-blue-400 capitalize">
                        {item.priority}
                      </span>{" "}
                      | Status:{" "}
                      <span className="text-orange-400 capitalize">
                        {item.status}
                      </span>
                    </span>
                  </li>

                  <div className="flex items-center gap-2 sm:justify-end border-t border-slate-800/60 pt-3 sm:pt-0 sm:border-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-sm font-medium rounded-lg border border-red-500/20 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex justify-end items-center border-t border-slate-800/40 pt-2 mt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-green-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString("en")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
