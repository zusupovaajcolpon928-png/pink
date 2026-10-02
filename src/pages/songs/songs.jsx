import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Songs.css";

function Songs() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get("https://fooapi.com/api/songs")
            .then(({ data }) => setSongs(Array.isArray(data?.data) ? data.data : []))
            .catch((error) => console.error("FooAPI songs request failed:", error));
    }, []);

    return (
        <div className="songs">

            <h1>Songs</h1>

            <div className="songs-list">

                {songs.map((song) => (
                    <div className="song-card" key={song.id}>

                        <h2>{song.name}</h2>

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