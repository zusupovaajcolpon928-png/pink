import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Songs.css";

function Songs() {
    const [songs, setSongs] = useState([]);

    const getSongs = async () => {
        try {
            const response = await axios.get(
                "https://fooapi.com/api/songs"
            );

            console.log(response.data);

            setSongs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSongs();
    }, []);

    return (
        <div className="songs">

            <h1>Songs</h1>

            <div className="songs-list">

                {songs.map((song) => (
                    <div className="song-card" key={song.id}>

                        <h2>{song.title}</h2>

                        <p>ID: {song.id}</p>

                        <Link to={`/songs/${song.id}`}>
                            View Song
                        </Link>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Songs;