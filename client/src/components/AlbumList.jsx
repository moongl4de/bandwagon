import React, { useState, useEffect, Fragment } from "react";
import { useStoreContext } from "../utils/globalContext";
// import logo from "../assets/img/reactlogo.png"
import API from "../utils/API";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns, Card, Button, Form, FormControl, Col, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Details from "./DetailsModal";
import "../App.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import Search from "./Searchbar"

import ReactDOM from 'react-dom'
// import ReactWOW from 'react-wow'

import { isAuth } from "./helper";
import { toast } from "react-toastify";

function AlbumList() {
  // access global state of albums
  // const [state, dispatch] = useStoreContext();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('')
  const [art, setArt] = useState('');

  const [modalShow, setModalShow] = React.useState(false);
  console.log(songs)

  const getSongs = () => {
    API.getSongs()
      .then((results) => {
        console.log("all songs from db:", results.data);
        setSongs(results.data);
        setSearchResults(results.data)
        // setCurrentSong(results.data[4])
      })
      .catch((err) => console.log(err));
  };



  const getCurrentSong = async (song) => {

    let clickedSongId = song._id;
    let clickedSongTitle = song.title.replace(/%20/g, " ");
    let clickedSongUrl = song.fileUrl;
    let clickedSongArtist = song.user.name;
    let clickedSongArt = song.album.art;
    setModalShow(true)




    setUrl(clickedSongUrl)
    setTitle(clickedSongTitle)
    setArt(clickedSongArt)
    setArtist(clickedSongArtist)

    setCurrentSong(song);
    await chargeListenerToken();
    await transferTokenToArtist(clickedSongId);
  };

  const albumFunction = (event) => {
    getCurrentSong(event);
  };



  const [listenerInfo, updateListenerInfo] = React.useState({
    subscriptionToken: 0,
    currentListenerData: {},
    paused: false,
  });


  useEffect(() => {
    // getAlbums();
    getSongs();


    //get current user and set subscription token and user info
    API.getUsers()
      .then((result) => {
        const id = isAuth()._id;
        const currentUser = result.data.filter((user) => user._id === id);
        //listners current token value at page load
        listenerInfo.subscriptionToken = currentUser[0].subscriptionToken;
        updateListenerInfo({
          ...listenerInfo,
          subscriptionToken: currentUser[0].subscriptionToken,
          currentListenerData: currentUser[0],
        });
      })
      .catch((err) => {
        toast.error("Failed to Get User info");
      });

  }, [listenerInfo.subscriptionToken]);

  const chargeListenerToken = async () => {
    if (listenerInfo.paused === false) {
      const token = Number(listenerInfo.subscriptionToken) - 1;
      //get user to charge token
      await API.getUsers().then(async (result) => {
        const email = isAuth().email;
        //set current user body to use in update request
        const currentUser = result.data.filter((user) => user.email === email);
        //calculate subscriptionToken
        const userSubscriptionToken = token;

        //update user payment required to false after intial signup
        const data = {
          ...currentUser[0],
          paymentRequired: false,
          subscriptionToken: userSubscriptionToken,
        };

        //update the user with the new token value
        await API.updateUser(data._id, data).then(() => {
          // transfer token to artist
          // transferTokenToArtist();
          //update state
          updateListenerInfo({
            ...listenerInfo,
            subscriptionToken: data.subscriptionToken,
            currentListenerData: data,
          });
        });
      });
    } else if (listenerInfo.paused === true) {
      updateListenerInfo({
        ...listenerInfo,
        paused: false,
      });
    }
  };

  const skipChargeOnResume = () => {
    updateListenerInfo({
      ...listenerInfo,
      paused: true,
    });
  };


  const transferTokenToArtist = async (id) => {
    //get the currentSongBody from DB
    await API.getSong(id).then(async (res) => {
      setCurrentSong({
        ...currentSong,
        ...res.data,
        token_earned: res.data.token_earned + 1,
        count_play: res.data.count_play + 1
      });
      API.updateSong({
        ...currentSong,
        ...res.data,
        token_earned: res.data.token_earned + 1,
        count_play: res.data.count_play + 1
      })
        .then((result) => {
          console.log("transferred ======= 1")
          toast.success("Successfully Transferred token to artist");
        })
    }).catch((err) => {
      console.log(err);
      // toast.danger( "Something went wrong" );
    });
  }



  const audioListTest = [
    {
      name: artist,
      singer: title,
      cover: art,
      musicSrc: () => {
        // console.log(currentSong.fileUrl, "currentSong.fileUrl");
        return Promise.resolve(`${url}`);
      },
    },
  ];

  const options = {
    audioLists: audioListTest,
    //default play index of the audio player  [type `number` default `0`]
    defaultPlayIndex: 0,

    //if you want dynamic change current play audio you can change it [type `number` default `0`]
    // playIndex: 0,

    //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
    theme: "dark",

    // Specifies movement boundaries. Accepted values:
    // - `parent` restricts movement within the node's offsetParent
    //    (nearest node with position relative or absolute), or
    // - a selector, restricts movement within the targeted node
    // - An object with `left, top, right, and bottom` properties.
    //   These indicate how far in each direction the draggable
    //   can be moved.
    // Ref: https://github.com/STRML/react-draggable#draggable-api
    bounds: "body",

    // Replace a new playlist with the first loaded playlist
    // instead of adding it at the end of it.
    // [type `boolean`, default `false`]
    clearPriorAudioLists: true,

    // Play your new play list right after your new play list is loaded turn false.
    // [type `boolean`, default `false`]
    autoPlayInitLoadPlayList: true,

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

    defaultPlayMode: "order",

    //audio mode        mini | full          [type `String`  default `mini`]
    mode: "full",

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: false,

    //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
    autoPlay: true,

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
    defaultVolume: 0.5,

    //playModeText show time [type `Number(ms)` default `700`]
    playModeShowTime: 600,

    //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
    loadAudioErrorPlayNext: true,

    // Auto hide the cover photo if no cover photo is available [type `Boolean` default `false`]
    autoHiddenCover: true,

    // Play and pause audio through blank space [type `Boolean` default `false`]
    spaceBar: true,
  };

  const [searchResults, setSearchResults] = useState([]);


  const searchFilter = (e) => {
    const filter = e.target.value;
    const filteredUserList = songs.filter(song => {
      let values = Object.values(song).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setSearchResults(filteredUserList);
  }



  return (


    <Fragment>
      <Search token={listenerInfo.subscriptionToken} />
      <Row className="justify-content-md-center">
        <Col md={5}>

          <Form inline>
            <FormControl
              style={{ textAlign: "center", width: "100%"}}
              type="text"
              placeholder="Search here..."
              className="mr-md-5"
              type="text"
              id="inputID"

              onChange={e => searchFilter(e)}
            />

          </Form>
        </Col>
      </Row>

      <div className="cardContainer">
        <h1 className="albumHeader"></h1>
        {songs.length ? (
          <div className="card-group">
            {searchResults.map((song) => (
              <div class="row">
                <Card
                  className="albumCard wow animate__animated animate__zoomIn col-10"
                  style={{ width: "18rem", padding: "2%",  }}
                  key={song._id}
                >
                  <Button

                    value={song._id}
                    className="albumBtn"
                    id={song._id}
                    title={song.title}
                    url={song.fileUrl}
                    art={song.album.art}
                    artist={song.user.name}
                    name="currentSong"
                    onClick={() => getCurrentSong(song)}
                  >

                    {" "}
                    <i style={{color: "white", boxShadow: "0px 0px 10px black"}}class="far fa-play-circle fa-5x"></i>{" "}
                  </Button>

                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}><strong>{song.user.name}</strong></Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>{song.title}</Card.Text>
                    <div className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      variant="top"
                      src={song.album.art}
                      style={{ height: "100%", width: "100%;", margin: "0 auto !important" }}
                      className="albumCardImage"
                    />
                    </div>
                    <Details />
                    {/* <Link to={"/albums/" + album._id}> */}
                    {/* <Details id={album._id} show={currentSong.modalShow} onHide={() => updateCurrentSong({ ...currentSong, modalShow: false })} /> */}
                    {/* </Link> */}
                  </Card.Body>
                  {/* <Card.Footer> */}
                    {/* <small className="text-muted">Added {album.date}</small> */}
                    {/* {song._id} */}
                  {/* </Card.Footer> */}

                </Card>
              </div>

            ))}
          </div>
        ) : (
            <h3>No albums available.</h3>
          )}

        <ReactJkMusicPlayer

          {...options}
          // onAudioPlay={chargeListenerToken}
          onAudioPause={skipChargeOnResume}
        />

      </div>
      {/* </div> */}
    </Fragment>
  );
}

export default AlbumList;
