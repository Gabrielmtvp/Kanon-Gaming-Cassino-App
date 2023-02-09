import './index.css';

import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface IArrowBackProps {
  url: string;
}

function ArrowBack(props: IArrowBackProps) {
  const navigate = useNavigate();

  function goBackHome() {
    navigate(props.url);
  }

  return (
    <div className="divArrowBack" onClick={() => goBackHome()}>
      <IoIosArrowBack size={30} />
    </div>
  );
}

export default ArrowBack;
