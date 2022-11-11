import styled from "styled-components";
import Search from "./components/Search";

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundLevel1 || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.borderBase || "#e5e5e5"};
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  position: fixed;
  width: 100%;
  .logo {
    width: 100%;
    max-width: 80px;
    @media (min-width: 600px) {
      max-width: 127px;
    }
    .text {
      fill: ${({ theme }) => theme.textColorBase || "#222222"};
    }
  }
`;

export default function Menu({ valorDoFiltro, setValorDoFiltro }) {
  return (
    <StyledMenu>
      <div>
        <Logo />
      </div>
      <Search valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
    </StyledMenu>
  );
}

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.55731 0L0 6.94865V34.7399H9.37245V39.9539H14.4894L19.6013 34.7399H27.2713L37.5 24.3215V0H2.55731ZM5.96436 3.47213H34.0915V22.5809L28.1239 28.6617H18.75L13.6396 33.8685V28.6617H5.96436V3.47213ZM15.3406 20.846H18.75V10.4245H15.3406V20.846ZM24.7151 20.846H28.1239V10.4245H24.7151V20.846Z" fill="#5A3E85" />
    </svg>
  )
}