import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { MdAddToPhotos, MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function MenuDots() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const options = [
    {
      label: 'See Details',
      icon: <MdRemoveRedEye />,
      action: () => navigate('/cryptos/:id'),
    },
    {
      label: 'Add To Watchlist',
      icon: <MdAddToPhotos />,
      action: () => {},
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'var(--color-grey-100)',
          },
        }}
      >
        <MoreVertIcon
          sx={{
            color: 'var(--color-grey-700)',
          }}
        />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 2.5,
              backgroundColor: 'var(--color-grey-0)',
              padding: '5px',
            },
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.label}
            selected={option.label === 'Pyxis'}
            onClick={() => {
              option.action();
              handleClose();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
              borderRadius: '5px',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'Poppins',
              marginBottom: '8px',
              '&:hover': {
                backgroundColor: 'var(--color-grey-100)',
                color: 'var(--color-grey-800)',
              },
              '&:last-child': {
                marginBottom: 0,
              },
            }}
          >
            {option.icon} {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
