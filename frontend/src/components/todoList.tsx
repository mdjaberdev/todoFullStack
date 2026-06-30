import React from "react";

function todoList() {
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
    <div>
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
  );
}

export default todoList;
