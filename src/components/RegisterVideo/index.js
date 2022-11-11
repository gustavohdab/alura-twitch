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

export default function RegisterVideo() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formCadastro = useForm({
    initialValues: {
      titulo: '',
      url: '',
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

            <input
              type="text"
              name="titulo"
              placeholder="Stream Title"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />

            <input
              type="text"
              name="url"
              placeholder="URL"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />

            <button type="submit">
              Register
            </button>

          </div>
        </form>
      )}
    </StyledRegisterVideo>
  )
}