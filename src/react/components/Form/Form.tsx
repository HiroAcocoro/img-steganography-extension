import { FC } from "react";
import "./Form.css";

type TFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: FC<TFormProps> = ({ onSubmit }) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input type="password" id="key" name="key" required placeholder="Key" />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <input type="submit" value="Encrypt" />
      </form>
    </div>
  );
};

export default Form;
