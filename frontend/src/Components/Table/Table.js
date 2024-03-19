import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { Table1Presentation } from './Table1Presentation';
import MusicCard from '../Card/Card';

const MusicTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSong = () => {
    axios.get(`http://127.0.0.1:8000/song/?text=${searchQuery}`)
      .then(response => {
        if (response.data.message) {
          // If song not found, display error message
          setErrorMessage('Song not found.');
          setSearchResult([]);
        } else {
          setSearchResult(response.data);
          setErrorMessage('');
        }
      })
      .catch(error => {
        console.error('Error fetching song:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setFilteredData(data.slice(indexOfFirstItem, indexOfLastItem));
  }, [data, currentPage, itemsPerPage]);

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/music/")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearch = (query) => {
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://127.0.0.1:8000/export/", requestOptions)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => console.error(error));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between my-10">
        <div>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter song title" className="border border-gray-300 rounded-md px-4 py-2 mr-2" />
          <button type="button" onClick={fetchSong} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Get Song
          </button>
        </div>
        <div>
          <button type="button" onClick={exportCSV} className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Export
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      {searchResult.length > 0 ? (
        searchResult.map((song, index) => (
          <MusicCard key={index} song={song} />
        ))
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">No songs found.</span>
        </div>
      )}

      <Table1Presentation
        data={filteredData}
        columns={[
          { Header: "Index", accessor: "id" },
          { Header: "ID", accessor: "music_id" },
          { Header: "Title", accessor: "title" },
          { Header: "Danceability", accessor: "danceability" },
          { Header: "Energy", accessor: "energy" },
          { Header: "Key", accessor: "key" },
          { Header: "Loudness", accessor: "loudness" },
          { Header: "Mode", accessor: "mode" },
          { Header: "Acousticness", accessor: "acousticness" },
          { Header: "Instrumentalness", accessor: "instrumentalness" },
          { Header: "Liveness", accessor: "liveness" },
          { Header: "Valence", accessor: "valence" },
          { Header: "Tempo", accessor: "tempo" },
          { Header: "Duration (ms)", accessor: "duration_ms" },
          { Header: "Time Signature", accessor: "time_signature" },
          { Header: "Num Bars", accessor: "num_bars" },
          { Header: "Num Sections", accessor: "num_sections" },
          { Header: "Num Segments", accessor: "num_segments" },
          { Header: "Class Field", accessor: "class_field" },
          { Header: "Rating", accessor: "rating" }
        ]}
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <div className="text-gray-600 text-sm mt-2">
        Showing {currentPage * itemsPerPage - itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
      </div>
    </div>
  );
};

export default MusicTable;
