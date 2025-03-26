import { FC } from "react";

type TFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: FC<TFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>key</label>
      <input type="password" id="key" name="key" required />

      <label>password</label>
      <input type="password" id="password" name="password" />

      <label>confirm password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
