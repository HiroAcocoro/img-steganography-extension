import { Dispatch, FC, SetStateAction } from "react";
import "./Form.css";

type TFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setKeyState: Dispatch<SetStateAction<string>>;
  decryptImg: () => void;
};

const Form: FC<TFormProps> = ({ onSubmit, setKeyState, decryptImg }) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <input
          type="password"
          id="key"
          name="key"
          onChange={(e) => setKeyState(e.target.value)}
          required
          placeholder="Key"
        />

        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Password"
        />

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          placeholder="Confirm password"
        />

        <div className="form-action-container">
          <input type="submit" value="Encrypt" />
          <button className="btn-decrypt" onClick={decryptImg}>
            Decrypt
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
