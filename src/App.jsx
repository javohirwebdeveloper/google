import React, { useState } from 'react';
import Apps from './public/apps.svg'
import { Button, IconButton, InputAdornment, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, MoreVert as MoreVertIcon, Mic as MicIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import CenterFocusStrongTwoToneIcon from '@mui/icons-material/CenterFocusStrongTwoTone';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppsIcon from '@mui/icons-material/Apps';


import Youtube from './public/y.png'
function App() {
  const [isOpen, setIsOpen] = useState(false);
    const [sites, setSites] = useState([
    { name: 'YouTube', url: 'https://www.youtube.com', icon: getIconForSite('YouTube') },
    { name: 'Facebook', url: 'https://www.facebook.com', icon: getIconForSite('Facebook') },
    { name: 'Telegram', url: 'https://www.Telergam.org', icon: getIconForSite('Telegram') },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: getIconForSite('Instagram') },
    { name: 'Netlify', url: 'https://app.netlify.com', icon: getIconForSite('Netlify') },

  ]);
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);

  function closeModal() {
    setIsOpen(false);
    setEditingIndex(-1);
    setAnchorEl(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  function addSiteWithUrl(site, url) {
    if (sites.length < 10 && site && url) {
      const icon = getIconForSite(site);
      setSites([...sites, { name: site, url, icon }]);
      setSearch('');
      setUrl('');
      closeModal();
    }
  }

  function deleteSite(index) {
    setSites(sites.filter((_, i) => i !== index));
    closeModal();
  }

  function editSite(index, site) {
    const newSites = [...sites];
    newSites[index] = site;
    setSites(newSites);
    closeModal();
  }

  function handleEdit(index) {
    const site = sites[index];
    setSearch(site.name);
    setUrl(site.url);
    setEditingIndex(index);
    openModal();
  }

  function handleSearch() {
    if (search.trim() !== '') {
      performGoogleSearch(search);
    }
  }

  function performGoogleSearch(query) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleSearchUrl, '_blank');
  }

  function handleClick(event, index) {
    setAnchorEl(event.currentTarget);
    setEditingIndex(index);
  }

  function handleClose() {
    setAnchorEl(null);
  }
function getIconForSite(siteName) {
  const knownSites = {
    'youtube': 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
    'facebook': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/2048px-Facebook_icon.svg.png',
    'telegram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
    'instagram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/800px-Instagram_icon.png',
    'netlify': 'https://cdn.iconscout.com/icon/free/png-256/free-netlify-3628945-3030170.png',
    'twitter': 'https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png',
    'x': 'https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png',
    'pinterest': 'https://static-00.iconduck.com/assets.00/pinterest-icon-497x512-g88cs2uz.png',
    'tiktok': 'https://static-00.iconduck.com/assets.00/tik-tok-icon-2048x2048-mmnsrcbe.png',
    'thread': 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/threads-app-icon.png',
    'github': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'
  };

  if (knownSites[siteName.toLowerCase()]) {
    return knownSites[siteName.toLowerCase()];
  }

  const firstLetter = siteName[0].toUpperCase();
  const iconSize = 40;
  const fontSize = 36; 

  const svgIcon = `
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 ${iconSize} ${iconSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${iconSize / 2}" cy="${iconSize / 2}" r="${iconSize / 2}" fill="#444746" />
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#FFFFFF" font-size="${fontSize}" font-family="Arial">${firstLetter}</text>
    </svg>
  `;

  const svgIconUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

  return svgIconUrl;
}
  const [drawerOpen, setDrawerOpen] = useState(false);

  const googleApps = [
    { name: 'Gmail', icon: 'https://static.vecteezy.com/system/resources/previews/022/484/516/original/google-mail-gmail-icon-logo-symbol-free-png.png', url: 'https://mail.google.com/' },
    { name: 'Drive', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png', url: 'https://drive.google.com/' },
    { name: 'Play', icon: 'https://static.vecteezy.com/system/resources/previews/022/484/511/non_2x/google-play-store-icon-logo-symbol-free-png.png', url: 'https://play.google.com/' },
  ];

  function toggleDrawer(open) {
    setDrawerOpen(open);
  }
  return (
  <div className="container mx-auto p-4">
    <div className='top-box'> <a href="https://mail.google.com/mail">Gmail</a> <a href="https://www.google.com/imghp?hl=ru&tab=ri&ogbl">Images</a> 
    <IconButton onClick={() => toggleDrawer(true)}>
      <img  src={Apps} alt="" />
      </IconButton>

     <Drawer
  anchor='right'
  className='modal-apps'
  open={drawerOpen}
  onClose={() => toggleDrawer(false)}
  PaperProps={{
    style: {
      height: '400px',
      width: '330px',
      top: '60px',
      borderRadius: '30px',
      border: '10px solid #282A2C',
      backgroundColor: '#1B1B1B', 
      overflow: 'auto' 
    }
  }}
>
        <div
          role="presentation"
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List > <div className='modal-right'>
            {googleApps.map((app, index) => (
              <ListItem className='modal-app' button key={index} onClick={() => window.open(app.url, '_blank')}>
                <ListItemIcon>
                  <img className='modal-icon' src={app.icon} alt="" />
                </ListItemIcon>
                <span>{app.name}</span>
              </ListItem>
            ))}</div>
          </List>
        </div>
      </Drawer></div>
   
    <h1>Google</h1>
      <div className="flex items-center bg-white rounded-md">
        <TextField
        className='bg-color  '
          fullWidth
          placeholder="Search or start new site..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <MicIcon />
                </IconButton>
                <IconButton>
                  <CenterFocusStrongTwoToneIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

     <div className=" site-box">
        {sites.map((site, index) => (
          <div key={index} className="p-4 rounded-full flex justify-between items-center site " onClick={() => window.open(site.url, '_blank')}>
            <div className="flex items-center w-12 h-12 rounded-full bg-[#444746] icon-bg">
              <img src={site.icon} alt={site.name} className="rounded-full icon" />
            </div>
            <span className="ml-2 site-name ">{site.name}</span>
            <MoreVertIcon onClick={(event) => {
              event.stopPropagation();
              handleClick(event, index);
            }} />
          </div>
        ))}
          {sites.length < 10 && (
          <div className="flex justify-center items-center">
            <IconButton color="primary" aria-label="add" onClick={openModal}>
              <AddCircleIcon style={{ fontSize: 40, color: '#444746' }} />
            </IconButton>
          </div>
        )}
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEdit(editingIndex)}>Edit</MenuItem>
        <MenuItem onClick={() => deleteSite(editingIndex)}>Delete</MenuItem>
      </Menu>

      <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>{editingIndex >= 0 ? 'Edit Site' : 'Add New Site'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Site name"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Site URL"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (editingIndex >= 0) {
                editSite(editingIndex, { name: search, url });
              } else {
                addSiteWithUrl(search, url);
              }
            }}
            color="primary"
          >
            {editingIndex >= 0 ? 'Save' : 'Add'}
          </Button>
          {editingIndex >= 0 && (
            <Button onClick={() => deleteSite(editingIndex)} color="secondary">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
