import React from "react";
import styled from "styled-components";
import config from "../config.json";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";



function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  const [playlists, setPlaylists] = React.useState({})

  React.useEffect(() => {
    service
      .getAllVideos()
      .then((response) => {
        console.log(response.data);
        const newPlaylists = { ...playlists }
        response.data.forEach((video) => {
          if (!newPlaylists[video.playlist]) {
            newPlaylists[video.playlist] = []
          }
          newPlaylists[video.playlist].push(video);
        })
        setPlaylists(newPlaylists);
        console.log("🚀 ~ file: index.js ~ line 25 ~ .then ~ setPlaylists", setPlaylists)
        console.log("🚀 ~ file: index.js ~ line 23 ~ response.data.forEach ~ playlists", playlists)
      });
  }, [])

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={playlists} />
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
  background-color: blue;
  /* background-image: url(${config.bg}); */
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  height: 230px;
`

function Header() {
  return (

    <StyledHeader>
      <StyledBanner bg={config.bg} />

      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} alt="" />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>

    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const videoTitleNormalized = video.title.toLowerCase()
                const searchValueNormalized = searchValue.toLowerCase()
                return videoTitleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
