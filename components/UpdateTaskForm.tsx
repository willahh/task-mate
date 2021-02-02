import { isApolloError } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUpdateTaskMutation } from "../generated/graphql-frontend";

interface Values {
  title: string;
}

export type IUpdateTaskFormProps = {
  id: number;
  initialValues: Values;
};

const UpdateTaskForm: React.FC<IUpdateTaskFormProps> = ({
  id,
  initialValues,
}) => {
  const [values, setValues] = useState<Values>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const [updateTask, { loading, error }] = useUpdateTaskMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateTask({
        variables: { input: { id, title: values.title } },
      });
      if (result.data?.updateTask) {
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    }
  };
  let errorMessage = "";
  if (error) {
    if (error.networkError) {
      errorMessage = "A network error occured., please try again.";
    } else {
      errorMessage = "Sorry, an error occured.";
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">{errorMessage}</p>}
      <p>
        <label htmlFor="title" className="field-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="text-input"
          value={values.title}
          onChange={handleChange}
        />
      </p>
      <p>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Loading" : "Sav"}
        </button>
      </p>
    </form>
  );
};

export { UpdateTaskForm };
