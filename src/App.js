import React, { Component } from 'react';
import './index.css';
import keys from './config'
import Axios from 'axios';

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
            key: keys.youtube,
            part: 'snippet',
            order: 'rating',
            type: 'video',
            channelId: 'UCnLdHOuue5i1O7TsH6oh07w',
            maxResults: 12,
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
            const videoParams = {
                id: joinedIds,
                part: 'contentDetails,player,recordingDetails,statistics',
                key: keys.youtube,
            }
            Axios.get(`https://www.googleapis.com/youtube/v3/videos/`, {
                params: videoParams,
            }).then(videosDetails => {
                let results = videos.map(video => {
                    const detail = videosDetails.data.items.filter(detail => detail.id === video.id.videoId)[0];
                    return {
                        ...video.snippet,
                        ...detail
                    }
                });
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
                    <h1 className="title">{searchedValue ? `Resultado para: "${searchedValue}"` : 'Todos os vídeos do Canal'}</h1>
                </div>
                <div className="container flex flex-wrap">
                    {videos.map(item =>
                        <div className="item">
                            <div className="flex">
                                <div className="img-container">
                                    <img src={item.thumbnails.default.url} />
                                </div>
                                <div className="content">
                                    <a className="title" href={'#' + item.id}>{item.title}</a>
                                    <div>view: {item.viewCount}</div>
                                    <div>{item.contentDetails.duration.replace('PT', '').replace('M', ':').replace('S', '')}</div>
                                    <div id={item.id} className="modal-window">
                                        <div className="modal">
                                            <a href="#" title="Close" className="modal-close">Close</a>
                                            <div className="video" dangerouslySetInnerHTML={{ __html: item.player.embedHtml }}></div>
                                            <div className="title">{item.title}</div>
                                            <div className="description">{item.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {
                    this.state.nextPageToken &&
                    <div className="button-container">
                        <buton type="button" className="button-mais-videos" onClick={this.loadMoreVideos}>Carregar mais vídeos...</buton>
                    </div> || ''
                }

            </div>
        );
    }
}

export default App;
