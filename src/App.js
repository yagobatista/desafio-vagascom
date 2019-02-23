import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import keys from './config'
import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.searchVideos =this.searchVideos.bind(this);
        this.state = {
            videos: [],
            nextPageToken: '',
            searchParam: '',
        };
    }
    getData(data = null) {
        const defaultData = {
            key: keys.youtube,
            part: 'snippet',
            order: 'rating',
            type: 'video',
            channelId: 'UCnLdHOuue5i1O7TsH6oh07w',
            maxResults: 16,
        };
        const params = { ...data, ...defaultData };
        const results = [];
        Axios.get(`https://www.googleapis.com/youtube/v3/search/`, {
            params,
        }).then(response => {
            const videos = response.data.items;
            const nextPageToken = response.data.nextPageToken;
            const { resultsPerPage, totalResults } = response.data.pageInfo;
            const videoIds = videos.map(video => video.id.videoId);
            const joinedIds = videoIds.join(',')
            debugger;
            const videoParams = {
                id: joinedIds,
                part: 'statistics',
                key: keys.youtube,
            }
            Axios.get(`https://www.googleapis.com/youtube/v3/videos/`, {
                params: videoParams,
            }).then(videosDetails => {
                const results = videos.map(video => {
                    return { ...video.snippet, ...videosDetails.data.items.filter(detail => detail.id === video.id.videoId)[0].statistics }
                });
                this.setState({ videos: results, nextPageToken });
            });
        });
    }
    componentDidMount() {
        this.getData();
    }

    searchVideos(event){
        debugger;
        this.setState({searchParam: event.target.value});
        this.getData({q: this.state.searchParam})
    }
    render() {
        const { videos } = this.state;
        return (
            <div className="row">
                <header>
                    <nav>
                        <ul>
                            <li><a href="#hey">Hey!</a></li>
                            <li><a href="#cool">Cool</a></li>
                            <li><a href="#truth">Truth</a></li>
                            <li><input value={this.state.searchParam} onChange={this.searchVideos}/></li>
                        </ul>
                    </nav>
                </header>
                {videos.map(item =>
                    <div className="item" key={item.id}>{item.title}
                        <img src={item.thumbnails.medium.url} />
                        view : {item.viewCount}
                    </div>
                )}
            </div>
        );
    }
}

export default App;
