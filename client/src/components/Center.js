import React from "react"
import "../App.css"
import ArtistContainer from "./ArtistContainer"
import Search from "./Searchbar"
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';


    const audioListTest = [
      {
        name: 'Despacito',
        singer: 'Luis Fonsi',
        cover:
          'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
        musicSrc: () => {
          return Promise.resolve(
            'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3'
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
    clearPriorAudioLists: false,

    // Play your new play list right after your new play list is loaded turn false.
    // [type `boolean`, default `false`]
    autoPlayInitLoadPlayList: false,

    //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
    //"auto|metadata|none" "true| false"
    preload: false,

    //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
    glassBg: false,

    //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
    remember: false,

    //The Audio Can be deleted  [type `Boolean`, default `true`]
    remove: true,

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
    showMiniModeCover: true,

    //audio playing progress is show of the "mini"  mode
    showMiniProcessBar: false,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,

    //drag the audio progress bar [type `Boolean` default `true`]
    seeked: true,

    //Display chrome media session.  [type `Boolean` default `false`]
    showMediaSession: true,

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
    showThemeSwitch: true,

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
    autoHiddenCover: false,

    // Play and pause audio through blank space [type `Boolean` default `false`]
    spaceBar: true,

}

//placeholder code

function Center() {
    let backgroundImageVariable = "https://www.followlyrics.com/storage/7/62272.jpg"
    return (
       
        <div style={{backgroundColor: "#303030", height: "100vh"}} id="centerDiv">
            <Search />

            <div className="containerTest" style={{ backgroundImage: 'url(https://www.followlyrics.com/storage/7/62272.jpg)', backgroundSize: "150%" }}>
                <ArtistContainer  />
                <i class="fas fa-heart fa-2x"></i>
                <i class="fas fa-share fa-2x"></i>
            </div>
            <ReactJkMusicPlayer {...options} />
        </div>
       
    )
}

export default Center;