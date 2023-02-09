import './index.css';

interface IInput {
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  required?: string;
  disabled?: boolean;
  maxlength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  maxlength,
}: IInput) {
  switch (type) {
    case 'text':
      return (
        <div className="customInput">
          <input
            type="text"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxlength}
            required
          />
        </div>
      );
    case 'email':
      return (
        <div className="customInput">
          <input
            type="text"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
          />
        </div>
      );
    case 'password':
      return (
        <div className="customInput">
          <input
            type="password"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
          />
        </div>
      );
    case 'submit':
      return (
        <div className="customInput">
          <button type="submit" disabled={disabled}>
            {name}
          </button>
        </div>
      );
    default:
      return <></>;
  }
}

export default CustomInput;
