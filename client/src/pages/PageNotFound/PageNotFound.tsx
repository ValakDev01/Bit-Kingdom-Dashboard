import { useNavigate } from 'react-router-dom';

import './PageNotFound.scss';

function PageNotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className='not-found' onClick={handleClick}>
      <div className='img-container'>
        <img src='../../../assets/img/notFound.png' alt='Page not found!' />
      </div>
    </div>
  );
}

export default PageNotFound;
