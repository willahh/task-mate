import React, { useState } from "react";

interface Values {
  title: string;
}

export type IUpdateTaskFormProps = {
  initialValues: Values;
};

const UpdateTaskForm: React.FC<IUpdateTaskFormProps> = ({ initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return (
    <form>
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
        <button type="submit" className="button">Save</button>
      </p>
    </form>
  );
};

export { UpdateTaskForm };
