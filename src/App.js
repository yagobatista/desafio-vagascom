import React, { Component } from 'react';
import './index.css';
import Axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            nextPageToken: '',
            searchParam: '',
            searchedValue: null,
        };
        this.loadMoreVideos = this.loadMoreVideos.bind(this);
        this.searchVideos = this.searchVideos.bind(this);
    }
    getData(data = null) {
        const defaultData = {
            key: process.env.REACT_APP_YOUTUBE_KEY,
            part: 'id',
            order: 'rating',
            type: 'video',
            channelId: 'UCnLdHOuue5i1O7TsH6oh07w',
            maxResults: 12,
        };
        const params = { ...data, ...defaultData };
        Axios.get(`https://www.googleapis.com/youtube/v3/search/`, {
            params,
        }).then(response => {
            const videos = response.data.items;
            const nextPageToken = response.data.nextPageToken;
            const videoIds = videos.map(video => video.id.videoId);
            const joinedIds = videoIds.join(',')
            const videoParams = {
              id: joinedIds,
              part: "snippet,contentDetails,player,recordingDetails,statistics",
              key: process.env.REACT_APP_YOUTUBE_KEY,
            };
            Axios.get(`https://www.googleapis.com/youtube/v3/videos/`, {
                params: videoParams,
            }).then(videosDetails => {
                let results = videos.map(video => videosDetails.data.items.filter(detail => detail.id === video.id.videoId)[0]); 
                if (data && data.pageToken) {
                    results = [...this.state.videos, ...results];
                }
                this.setState({ videos: results, nextPageToken });
            });
        });
    }
    componentDidMount() {
        this.getData();
    }

    loadMoreVideos() {
        const { nextPageToken } = this.state;
        this.getData({ pageToken: nextPageToken });
    }

    searchVideos(event) {
        if (event.key === "Enter") {
            this.getData({ q: this.state.searchParam })
            this.setState({ searchedValue: this.state.searchParam });
        }
    }
    render() {
        const { videos, searchedValue } = this.state;
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li className="logo">
                                <span className="material-icons"> play_circle_outline</span><span>Fictícia vídeos</span>
                            </li>
                            <li>
                                <input
                                    value={this.state.searchParam}
                                    onChange={event => { this.setState({ searchParam: event.target.value }) }}
                                    onKeyPress={this.searchVideos}
                                    placeholder="Pesquisa..."
                                    className="pesquisa"
                                />
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="container flex">
                    <h1 className="main-title">{searchedValue ? `Resultado para: "${searchedValue}"` : 'Todos os vídeos do Canal'}</h1>
                </div>
                <div className="container flex flex-wrap">
                    {videos.map(item =>
                        <div className="item">
                            <div className="flex">
                                <div className="img-container">
                                    <a href={'#' + item.id}>
                                        <img src={item.snippet.thumbnails.default.url} alt="thumbnail do vídeo" />
                                        <div className="time">{item.contentDetails.duration.replace('PT', '').replace('M', ':').replace('S', '')}</div>
                                    </a>
                                </div>
                                <div className="content">
                                    <a href={'#' + item.id}>
                                        <ResponsiveEllipsis
                                            text={item.snippet.title}
                                            maxLine={2}
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters'
                                            className='title'
                                        />
                                    </a>
                                    <div className="views"><span className="material-icons">visibility</span><span>{item.statistics.viewCount} views</span></div>
                                    <div id={item.id} className="modal-window">
                                        <div className="modal">
                                            <a href="#" title="Close" className="modal-close">Close</a>
                                            <div className="video" dangerouslySetInnerHTML={{ __html: item.player.embedHtml }}></div>
                                            <div className="title">{item.snippet.title} <span className="material-icons">visibility</span><span>{item.statistics.viewCount} views</span></div>
                                            <div className="description">{item.snippet.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {
                    (this.state.nextPageToken &&
                        <div className="button-container">
                            <buton type="button" className="button-mais-videos" onClick={this.loadMoreVideos}>Carregar mais vídeos...</buton>
                        </div>) || ''
                }

            </div>
        );
    }
}

export default App;
