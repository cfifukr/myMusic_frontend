import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import './App.css';
import SidebarCustom from './components/sidebar/SidebarCustom';
import { useState } from 'react';
import Home from './components/home/Home';
import GenresMusic from './components/music/GenresMusic';
import PlaylistsPage from './components/playlistsPage/PlaylistsPage';
import LibraryPage from './components/library/LibraryPage';
import ChartPage from './components/chart/ChartPage';

function App() {
  const [currentMusicId, setCurrentMusicId] = useState(1);
  const [isPlayed, setIsPlayed] = useState(false);

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/genres",
      element:<GenresMusic 
          currentMusicId={currentMusicId} 
          setCurrentMusicId={setCurrentMusicId} 
          isPlayed={isPlayed} 
          setIsPlayed = {setIsPlayed}/>
    },
    {
      path:"/playlists",
      element:<PlaylistsPage userId={1}/>
    },
    {
      path:"/library",
      element:<LibraryPage userId={1}/>
    },
    {
      path:"/chart",
      element:<ChartPage 
          currentMusicId={currentMusicId} 
          setCurrentMusicId={setCurrentMusicId} 
          isPlayed={isPlayed} 
          setIsPlayed = {setIsPlayed}/>
    }
  ]);
  

  
  return <>
    
    <div className='wrapper'>
      <div className='sidebar'>
        <SidebarCustom 
          currentMusicId={currentMusicId} 
          setCurrentMusicId={setCurrentMusicId} 
          isPlayed={isPlayed} 
          setIsPlayed = {setIsPlayed}/>
      </div>
      <div className='content'>
        <RouterProvider router={router}/>

    
      </div>
      

    </div>
  </>;
}

export default App;
