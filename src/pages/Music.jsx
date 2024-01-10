import React from 'react';
import ReactPlayer from 'react-player';

const Music = () => {
  const musicUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';

  return (
    <div className="flex justify-center items-center h-screen">
      <ReactPlayer url={musicUrl} playing controls />
    </div>
  );
}

export default Music;