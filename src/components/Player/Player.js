import React, { Component } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ReactPlayer from "react-player";
import _ from "lodash";
import FontAwesome from "react-fontawesome";
import Duration from "./Duration/Duration";

class Player extends Component {
  state = {
    speed: [
      {
        id: 0,
        title: "0.5x",
        selected: false,
        rate: 0.5,
        key: "speed"
      },
      {
        id: 1,
        title: "0.75x",
        selected: false,
        rate: 0.75,
        key: "speed"
      },
      {
        id: 2,
        title: "1.00x",
        selected: true,
        rate: 1,
        key: "speed"
      },
      {
        id: 3,
        title: "1.25x",
        selected: false,
        rate: 1.25,
        key: "speed"
      },
      {
        id: 4,
        title: "1.5x",
        selected: false,
        rate: 1.5,
        key: "speed"
      },
      {
        id: 5,
        title: "1.75x",
        selected: false,
        rate: 1.75,
        key: "speed"
      },
      {
        id: 6,
        title: "2.0x",
        selected: false,
        rate: 2.0,
        key: "speed"
      }
    ],
    player: {
      url: null,
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      seeking: false
    }
  };

  //Drop down handle
  toggleSelected = (id, key) => {
    let temp = this.state[key];
    temp.forEach(item => (item.selected = false));
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });
    const currentSpeed = this.state.speed.find(item => item.selected === true);
    this.handleSetPlaybackRate(currentSpeed.rate);
  };

  //React Player Handle
  load = url => {
    this.setState({
      player: {
        ...this.state.player,
        url: url,
        played: 0,
        loaded: 0,
        pip: false
      }
    });
  };

  //   componentDidUpdate() {
  //     console.log("hello world", this.props);
  //     this.load(this.props.source.AudioStream.data);
  //   }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.source !== this.props.source) {
      this.load(this.props.source.data.url);
    }
  }

  componentDidMount() {
    // this.load("https://pte-learning.s3-ap-southeast-2.amazonaws.com/517.mp3");
    // this.load(this.props.source.AudioStream.data);
    // console.log("hello world", this.props.source);
  }

  handlePlayPause = () => {
    console.log("before play pause", this.state);
    this.setState({
      player: { ...this.state.player, playing: !this.state.player.playing }
    });
    console.log("after play pause", this.state);
  };

  handleVolumeChange = e => {
    this.setState({
      player: { ...this.state.player, volume: parseFloat(e.target.value) }
    });
    console.log(this.state);
  };

  handleToggleMuted = () => {
    this.setState({
      player: { ...this.state.player, muted: !this.state.player.muted }
    });
  };

  handleSetPlaybackRate = rate => {
    this.setState({
      player: { ...this.state.player, playbackRate: parseFloat(rate) }
    });
  };

  handleSeekMouseUp = e => {
    console.log("seeking change 123", e.target.value);
    this.setState({ player: { ...this.state.player, seeking: false } });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleSeekMouseDown = e => {
    this.setState({ player: { ...this.state.player, seeking: true } });
  };

  handleSeekChange = e => {
    console.log("seeking change", e.target.value);
    this.setState({
      player: { ...this.state.player, played: parseFloat(e.target.value) }
    });
  };

  handleProgress = state => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.player.seeking) {
      console.log(state);
      //   this.setState({ player: { ...this.state.player, obj } });
      this.setState({
        player: {
          ...this.state.player,
          playedSeconds: state.playedSeconds,
          played: state.played,
          loadedSeconds: state.loadedSeconds,
          loaded: state.loaded
        }
      });
      console.log("on progress hello", this.state);
    }
  };

  handleEnded = () => {
    console.log("onEnded");
    console.log(this.state);
    this.setState({
      player: { ...this.state.player, playing: this.state.player.loop }
    });
    console.log("after end", this.state);
  };

  handleDuration = duration => {
    console.log("onDuration", duration);
    this.setState({
      player: { ...this.state.player, duration }
    });
  };

  handleTogglePIP = () => {
    this.setState({
      player: { ...this.state.player, pip: !this.state.player.pip }
    });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({
      player: { ...this.state.player, playing: true }
    });
  };

  handleEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({
      player: { ...this.state.player, pip: true }
    });
  };

  handleDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({
      player: { ...this.state.player, pip: false }
    });
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = player => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip
    } = this.state.player;
    return (
      <React.Fragment>
        <div
          className="form-group border rounded d-inline-flex align-items-center align-items-sm-center align-items-md-center float-left"
          style={{ padding: "10px" }}
        >
          <button
            className="btn mr-1"
            type="button"
            onClick={this.handlePlayPause}
          >
            {/* <i className="fas fa-volume-up"></i> */}
            {this.state.player.playing ? (
              <FontAwesome name="pause-circle" size="3x" />
            ) : (
              <FontAwesome name="play-circle" size="3x" />
            )}
          </button>
          <Dropdown
            title="1.0x"
            list={this.state.speed}
            toggleSelected={this.toggleSelected}
          ></Dropdown>
          {console.log("ddddddddd", this.state.player.duration)}
          {this.state.player.loaded !== 0 ? (
            <input
              type="range"
              className="custom-range mr-1 d-none d-sm-block"
              min={0}
              max={1}
              step="any"
              value={played}
              onMouseDown={this.handleSeekMouseDown}
              onChange={this.handleSeekChange}
              onMouseUp={this.handleSeekMouseUp}
            />
          ) : (
            <div style={{ width: "130px" }}></div>
          )}

          <label className="text-success mr-1" style={{ fontSize: "13px" }}>
            {/* this.state.player.loaded !== 0 && this.state.player.played >= 1 */}
            {isFinite(duration) && duration !== 0 ? (
              <Duration seconds={duration * played} /> /
              <Duration seconds={duration} />
            ) : !_.isNil(this.state.player.playedSeconds) ? (
              <Duration seconds={this.state.player.playedSeconds} />
            ) : (
              "0:00"
            )}
          </label>
          <button
            className="btn btn-secondary mr-1"
            type="button"
            onClick={this.handleToggleMuted}
          >
            {this.state.player.muted ? (
              <FontAwesome name="volume-off" />
            ) : (
              <FontAwesome name="volume-up" />
            )}
          </button>
          <input
            type="range"
            className="custom-range mr-1"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={this.handleVolumeChange}
            style={{ maxWidth: "60px" }}
          />
        </div>
        <div>
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log("onReady")}
            onStart={() => console.log("onStart")}
            onPlay={this.handlePlay}
            onEnablePIP={this.handleEnablePIP}
            onDisablePIP={this.handleDisablePIP}
            onPause={this.handlePause}
            onBuffer={() => console.log("onBuffer")}
            onSeek={e => console.log("onSeek", e)}
            onEnded={this.handleEnded}
            onError={e => console.log("onError", e)}
            onProgress={this.handleProgress}
            onDuration={this.handleDuration}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Player;
