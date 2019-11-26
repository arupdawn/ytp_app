import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTube from 'react-youtube';

let source = "UV_MGsAv6Ho";
let arr = ["M1eNKG5Qi28",
            "Q_1pyfPtyY4",
            "h7gyJRWrjbg",
            "yYd_WuDegwQ"
          ];


class App extends Component {

  constructor(props){
    
    super(props);

        this.state = {
            textValue :'',
            vidUrl : ''
        }

  }

  onChangeText(e){
    this.setState({
      textValue: e.target.value
    })
  }

  remove(){
        
        this.getarr = localStorage.getItem('array');
        this.getarrnew = JSON.parse(this.getarr);
        
        this.getarrnew.shift();
        localStorage.setItem('array',JSON.stringify(this.getarrnew));
        
        this.render();
        window.history.go();
  }

  removeRandom(e){
        this.getarr = localStorage.getItem('array');
        this.getarrnew = JSON.parse(this.getarr);

        this.getarrnew.splice(e.target.id,1);
        localStorage.setItem('array',JSON.stringify(this.getarrnew));

        this.render();
        window.history.go();
  }

  addurl(){

    this.getarr = localStorage.getItem('array');
    this.getarrnew = JSON.parse(this.getarr);

    if(this.state.textValue.length == 11){

    this.getarrnew.unshift(this.state.textValue);

    localStorage.setItem('array',JSON.stringify(this.getarrnew));

    }
    else{
      alert ("Please enter a valid video URL");
    }

    this.render();
  }

  seturl(){
    localStorage.setItem('array',JSON.stringify(arr));
    this.render();
    window.history.go();
  }

  componentDidMount () {
    localStorage.setItem('a',1);
  }


  render() {

    if(localStorage.getItem('array') == null){
      this.seturl();
    }
    
    this.getarr = localStorage.getItem('array');
    this.getarrnew = JSON.parse(this.getarr);
    
    console.log("Array is: "+this.getarrnew[0]);

    const opts = {
      height: '463',
      width: '80%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Youtube Player App</h1>
        </header>
        <br></br>
        
        <div className="MainContainer">
              <p>( <strong>Note </strong>: Please enter the video id of the youtube link, the video id is the 11 lettered
                aplhanumeric id which is present at the last of the youtube link.  )
              </p>
              
            <div>
              <form>
                <input type="text" placeholder="Enter video Id..." name="add"  value={this.state.textValue}
                  onChange={this.onChangeText.bind(this)} />
                <button className="btn btn-info" onClick={this.addurl.bind(this)}>Add Url</button>
              </form>
            </div>
            

            <div className="vidPlayer" id="player">
                <YouTube videoId={this.getarrnew[0]} opts={opts} onEnd={this.remove.bind(this)}
                />
            </div>
            <br></br><br></br>

            <button  className="search-container btn btn-primary" onClick={this.seturl.bind(this)}>
                Reset Playlist
            </button>
            <br></br><br></br>

            {
              this.getarrnew.map((arrr,i) => {

                return(
                  
                  <div key={i} >
                  <div><b className="Lists">Link{' '}{i+1}{' - '}</b>
                        {arrr}{' '}
                        <i id={i} onClick={this.removeRandom.bind(this)} className="cross fa fa-remove"></i>
                  </div>
                  </div>
                  
                )
                
              })
            }
            

        </div>

      </div>
    );
  }
}

export default App;
