import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "../components/adNavbar.jsx";
import Footer from "../components/adFooter";
import Sidebar from "../components/adSidebar";
import { isAuth } from "../components/helper";
import API from "../utils/API";
import { toast } from "react-toastify";
import moment from 'moment';



import { style } from "../variables/Variables.jsx";
import routes from "../routes.js";
import image from "../assets/img/sidebar-1.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    // this.updateSongInfo = this.updateSongInfo.bind(this);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      totalSongsUploaded: 0,
      totalTokenEarned: 0,
      totalNumberPlayed: 0,
      songPlayPercentage: [0, 0, 0],
      songPlayName: ['a', 'b', 'c'],
      //album data for bar chart
      albumNameData :[],
      albumPlayCountData: [],
      albumTokenData:[],
      albumCreatedDateData:[],

    };
  }



  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {

        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
                totalPlay={this.state.totalSongsUploaded}
                totalTokenEarned={this.state.totalTokenEarned}
                totalNumberPlayed={this.state.totalNumberPlayed}
                songPlayPercentage={this.state.songPlayPercentage}
                songPlayName={this.state.songPlayName}
                albumNameData ={this.state.albumNameData}
                albumPlayCountData = {this.state.albumPlayCountData}
                albumTokenData = {this.state.albumTokenData}
                albumCreatedDateData = {this.state.albumCreatedDateData}

              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        'Bandwagon'.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Dashboard";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    //get user info from localStorage
    const userId = isAuth()._id;

    //try to search by passing a search parameter
    API.getSongByUserId(userId).then((resSong) => {

      //set data for pie chart
      const songPlayCountData = [];
      const songPlayNameData = [];
      let sum = 0;
      resSong.data.forEach(song => {
        sum = sum + song.count_play;
        songPlayCountData.push(song.count_play);
        songPlayNameData.push(song.title);
      })

      // calculate percentage for play count
      const songPlayPercentageData = songPlayCountData.map(count => {
        return Math.round((100 * count) / sum)
      })
      //set state for pie chart data
      this.setState({ songPlayPercentage: songPlayPercentageData })
      this.setState({ songPlayName: songPlayNameData })

      const artistSongs = resSong.data.filter(song => song.user._id === userId);
      let totalTokenEarned1 = 0;
      let totalNumberPlayed1 = 0;
      for (let i = 0; i < artistSongs.length; i++) {
        totalTokenEarned1 += artistSongs[i].token_earned;
        totalNumberPlayed1 += artistSongs[i].count_play;
      }
      console.log("totalTokenEarned1 " + totalTokenEarned1)
      this.setState({ totalSongsUploaded: artistSongs.length });
      this.setState({ totalTokenEarned: totalTokenEarned1 });
      this.setState({ totalNumberPlayed: totalNumberPlayed1 });


      //generate data for bar chart
      API.getAlbumByUserId(userId).then((resAlbum) => {
        //generate data correlation between album and song
        // let albumPlayData = [];
        let albumNameData1 = [];
        let albumPlayCountData1 = [];
        let albumTokenData1 = [];
        let albumCreatedDateData1 = [];
        const albumInfo = resAlbum.data.map(album => {
          if(album.song_ids.length > 0){
          let playCount = 0;
          let tokenCount = 0;
          for (let i = 0; i < resSong.data.length; i++) {
            if (album._id === resSong.data[i].albumId) {
              playCount = playCount + Number(resSong.data[i].count_play);
              tokenCount = tokenCount + Number(resSong.data[i].token_earned);
            }
          }

          albumNameData1.push(album.title);
          albumPlayCountData1.push(playCount);
          albumTokenData1.push(tokenCount);
          albumCreatedDateData1.push(moment(album.createdAt).format('MM/DD/YYYY'));
        }
        })
        this.setState({ albumNameData: albumNameData1 });
        this.setState({ albumPlayCountData: albumPlayCountData1 });
        this.setState({ albumTokenData: albumTokenData1 });
        this.setState({ albumCreatedDateData: albumCreatedDateData1 });

      })


    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    // if (e.history.action === "PUSH") {
    //   document.documentElement.scrollTop = 0;
    //   document.scrollingElement.scrollTop = 0;
    //   this.refs.mainPanel.scrollTop = 0;
    // }

  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText('Bandwagon')}
          />
          <Switch >{this.getRoutes(routes)} totalPlay={this.state.totalSongsUploaded}</Switch>
          <Footer />

        </div>
      </div>
    );
  }
}

export default Admin;