import useUser from '../../hooks/authentication/useUser';

import './UserAvatar.scss';

function UserAvatar() {
  const { data } = useUser();
  return (
    <div className='user-avatar'>
      <img
        src={
          data?.data?.photo
            ? `http://localhost:5000/img/users/${data.data.photo}`
            : '/assets/icons/default-user.jpg'
        }
        alt={`Avatar of ${data?.data?.name}`}
        className='avatar'
      />
      <span>{data?.data?.name.split(' ')[0]}</span>
    </div>
  );
}

export default UserAvatar;
