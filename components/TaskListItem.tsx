import { Reference } from "@apollo/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { TaskStatus } from "../generated/graphql-backend";
import {
  Task,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../generated/graphql-frontend";

interface ITaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<ITaskListItemProps> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: "all",
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask;

      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter((task) => {
                return readField("id", task) !== deletedTask.id;
              });
            },
          },
        });
      }
    },
  });
  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await deleteTask();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (error) {
      alert("An error occured, please try again.");
    }
  }, [error]);

  const [
    updateTask,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useUpdateTaskMutation({
    errorPolicy: "all",
  });
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked
      ? TaskStatus.Completed
      : TaskStatus.Active;

    updateTask({ variables: { input: { id: task.id, status: newStatus } } });
  };

  useEffect(() => {
    if (updateTaskError) {
      alert('An error occured, please try again.')
    }
  }, [updateTaskError]);

  return (
    <li className="task-list-item" key={task.id}>
      <label className="checkbox">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          checked={task.status === TaskStatus.Completed}
          disabled={updateTaskLoading}
        />
        <span className="checkbox-mark">&#10003;</span>
      </label>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        onClick={handleDeleteClick}
        disabled={loading}
        className="task-list-item-delete"
      >
        &times;
      </button>
      {/* ({task.status}) */}
    </li>
  );
};

export default TaskListItem;
