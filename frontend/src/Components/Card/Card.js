import React from 'react';

const MusicCard = ({ song }) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {song.title}
      </h3>
      <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-500">
        Artist: {song.artist}
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Danceability: {song.danceability}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Energy: {song.energy}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Key: {song.key}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Loudness: {song.loudness}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Mode: {song.mode ? '1' : '0'}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Acousticness: {song.acousticness}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Instrumentalness: {song.instrumentalness}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Liveness: {song.liveness}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Valence: {song.valence}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Tempo: {song.tempo}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Duration (ms): {song.duration_ms}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Time Signature: {song.time_signature}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Number of Bars: {song.num_bars}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Number of Sections: {song.num_sections}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Number of Segments: {song.num_segments}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Class Field: {song.class_field}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Rating: {Array.from({ length: song.rating }, (_, i) => (
          <span key={i} className="text-yellow-500">&#9733;</span>
        ))}
      </p>
    </div>
  );
};

export default MusicCard;
