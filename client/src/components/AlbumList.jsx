import React, { useSate, useEffect } from "react";
import { useStoreContext } from "../utils/globalContext";
// import logo from "../assets/img/reactlogo.png"
import API from "../utils/API";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Details from "./DetailsModal";
import "../App.css"
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function AlbumList() {
  // access global state of albums
  const [state, dispatch] = useStoreContext();

  // const [modalShow, setModalShow] = React.useState(false);
  const [currentSong, updateCurrentSong] = React.useState({modalShow: false, currentSongList: {}})

  //   console.log(state)

  const getAlbums = () => {
    dispatch({ type: "LOADING" });
    API.getAlbums()
      .then((results) => {
        console.log("all albums from db:", results.data);
        dispatch({
          type: "LOAD_ALBUMS",
          albums: results.data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAlbums();
    console.log("useEffect State:",state)
  }, []);


  useEffect(() => { console.log(currentSong)}, [currentSong])

  const getAlbumId = (event) => {
    let idVariable = state.albums.filter(album => album._id === event.target.value)[0]
    // console.log("EVENT: ***********", {...currentSong, ...idVariable[0]})
    updateCurrentSong({currentSongList: idVariable, modalShow: true})
    
    console.log("CURRENT SONG: ", currentSong)
  }

  const albumFunction = (event) => {
    getAlbumId(event);
    
    // updateCurrentSong({...currentSong, modalShow: true})
  
    console.log("CLICKED")
  }

  
const audioListTest = [
  {
    name: currentSong.currentSongList.title,
    singer: currentSong.currentSongList.title,
    cover:
    currentSong.currentSongList.art,
    musicSrc: () => {
      return Promise.resolve(
        `${currentSong.currentSongList.songs}`
      )
    },
  },
]

const options = {

  audioLists: audioListTest,
  //default play index of the audio player  [type `number` default `0`]
  defaultPlayIndex: 0,

  //if you want dynamic change current play audio you can change it [type `number` default `0`]
  // playIndex: 0,

  //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
  theme: 'dark',

  // Specifies movement boundaries. Accepted values:
  // - `parent` restricts movement within the node's offsetParent
  //    (nearest node with position relative or absolute), or
  // - a selector, restricts movement within the targeted node
  // - An object with `left, top, right, and bottom` properties.
  //   These indicate how far in each direction the draggable
  //   can be moved.
  // Ref: https://github.com/STRML/react-draggable#draggable-api
  bounds: 'body',

  // Replace a new playlist with the first loaded playlist
  // instead of adding it at the end of it.
  // [type `boolean`, default `false`]
  clearPriorAudioLists: true,

  // Play your new play list right after your new play list is loaded turn false.
  // [type `boolean`, default `false`]
  autoPlayInitLoadPlayList: false,

  //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
  //"auto|metadata|none" "true| false"
  preload: false,

  //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
  glassBg: true,

  //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
  remember: false,

  //The Audio Can be deleted  [type `Boolean`, default `true`]
  remove: false,

  //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
  defaultPosition: {
      top: 300,
      left: 120,
  },

  defaultPlayMode: 'order',

  //audio mode        mini | full          [type `String`  default `mini`]
  mode: 'full',

  /**
   * [ type `Boolean` default 'false' ]
   * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
   */
  once: false,

  //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
  autoPlay: false,

  //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
  toggleMode: true,

  //audio cover is show of the "mini" mode [type `Boolean` default 'true']
  showMiniModeCover: false,

  //audio playing progress is show of the "mini"  mode
  showMiniProcessBar: true,

  //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
  drag: true,

  //drag the audio progress bar [type `Boolean` default `true`]
  seeked: true,

  //Display chrome media session.  [type `Boolean` default `false`]
  showMediaSession: false,

  //Displays the audio load progress bar.  [type `Boolean` default `true`]
  showProgressLoadBar: true,

  //play button display of the audio player panel   [type `Boolean` default `true`]
  showPlay: true,

  //reload button display of the audio player panel   [type `Boolean` default `true`]
  showReload: true,

  //download button display of the audio player panel   [type `Boolean` default `true`]
  showDownload: false,

  //loop button display of the audio player panel   [type `Boolean` default `true`]
  showPlayMode: true,

  //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
  showThemeSwitch: false,

  //lyric display of the audio player panel   [type `Boolean` default `false`]
  showLyric: false,

  //destroy player button display  [type `Boolean` default `false`]
  showDestroy: false,

  //Extensible custom content       [type 'Array' default '-' ]
  extendsContent: null,

  //default volume of the audio player [type `Number` default `1` range `0-1`]
  defaultVolume: 1,

  //playModeText show time [type `Number(ms)` default `700`]
  playModeShowTime: 600,

  //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
  loadAudioErrorPlayNext: true,

  // Auto hide the cover photo if no cover photo is available [type `Boolean` default `false`]
  autoHiddenCover: true,

  // Play and pause audio through blank space [type `Boolean` default `false`]
  spaceBar: true,
}

  return (
    <Container>
      <h1 className="albumHeader">All Albums</h1>
      {state.albums.length ? (
        <CardColumns>
          {state.albums.map((album) => (
            <Card className="albumCard animate__animated animate__fadeIn" style={{ width: "18rem" }} key={album._id}>
              <Card.Img
                variant="top"
                src={album.art}
                style={{ height: "300px" }}
              />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>{album.description}</Card.Text>
                <Button value={album._id} className="albumBtn" onClick={albumFunction}> Details </Button>
                {/* <Link to={"/albums/" + album._id}> */}
                <Details id={album._id} show={currentSong.modalShow} onHide={() => updateCurrentSong({...currentSong,modalShow: false})} />
                {/* </Link> */}
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Added {album.date}</small>
              </Card.Footer>
              <ReactJkMusicPlayer {...options} />
            </Card>
          ))}
        </CardColumns>
      ) : (
        <h3>No albums available.</h3>
      )}
    </Container>
  );
}

export default AlbumList;

{
  /* // <strong>
// {album.title} by User name here {}
// {album.songs}
// </strong> */
}
