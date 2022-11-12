import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      })
    },
    clearForm() {
      setValues(propsDoForm.initialValues)
    }
  }
}

const PROJECT_URL = "https://dmsbvwgzrybjrkdpzpoq.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtc2J2d2d6cnlianJrZHB6cG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTA4MDIsImV4cCI6MTk4Mzc4NjgwMn0.AJdZXoVfPYgfw89lkyzXLR3RHJFyhoHrcKLpOoHnBgU";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
const getThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    videoId = videoId.substring(0, ampersandPosition);
  }
  return `https://img.youtube.com/vi/${videoId}/0.jpg`;
};


export default function RegisterVideo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formCadastro = useForm({
    initialValues: {
      titulo: '',
      url: '',
      playlist: '',
    },
  });

  console.log(isModalOpen);
  return (
    <StyledRegisterVideo>
      <button
        className="add-video"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      {isModalOpen && (
        <form onSubmit={(event) => {
          event.preventDefault();

          supabase.from("video").insert({
            title: formCadastro.values.titulo,
            url: formCadastro.values.url,
            thumb: getThumbnail(formCadastro.values.url),
            playlist: "Recent Broadcasts (Vods)",
          }).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.log(error);
          })

          setIsModalOpen(false);
          formCadastro.clearForm();
        }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
              type="button"
            >
              X
            </button>

            <h2>Register Stream / Video</h2>

            <label
              htmlFor="titulo"
            >
              Title:
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Stream Title"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />

            <label
              htmlFor="url"
            >
              Enter URL:
            </label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder="URL"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />

            <label
              htmlFor="playlist"
            >
              Choose an option:
            </label>
            <select
              name="playlist"
              id="playlist"
              value={formCadastro.values.playlist}
              onChange={formCadastro.handleChange}
            >
              <option value="Recent broadcasts">
                Recent Broadcasts
              </option>
              <option value="Popular clips">
                Popular clips
              </option>
              <option value="Recent highlights and uploads">
                Recent highlights and uploads
              </option>
            </select>

            <button type="submit">
              Register
            </button>

          </div>
        </form>
      )}
    </StyledRegisterVideo>
  )
}