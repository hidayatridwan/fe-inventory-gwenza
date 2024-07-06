import { Form, Outlet } from "react-router-dom";
import styled from "styled-components";
import Menu from "../components/Menu";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  flex: 1;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1001;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    transform: translateX(-100%);
    z-index: 1001;

    &.active {
      transform: translateX(0);
    }
  }
`;

const Main = styled.div`
  flex: 3;
  width: 100%;
  background-color: #ecf0f1;
  color: #2c3e50;
  padding: 20px;
  position: relative;

  .toggle-button {
    display: none;
    position: absolute;
    top: 10px;
    left: 10px;
    color: #2c3e50;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex: none;

    .toggle-button {
      display: block;
    }

    h1 {
      text-align: center;
    }
  }
`;

const Backdrop = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &.active {
    display: block;
  }
`;

function RootLayout() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive((isSidebarActive) => !isSidebarActive);
  };

  return (
    <Container>
      <Sidebar
        onClick={() => setIsSidebarActive(false)}
        className={isSidebarActive ? "active" : ""}
      >
        <Menu />
        <Form method="post" action="/logout">
          <div className="d-grid">
            <button className="btn btn-light">Logout</button>
          </div>
        </Form>
      </Sidebar>
      <Main>
        <button onClick={toggleSidebar} className="toggle-button">
          ☰
        </button>
        <Outlet />
      </Main>
      <Backdrop
        className={isSidebarActive ? "active" : ""}
        onClick={toggleSidebar}
      ></Backdrop>
    </Container>
  );
}

export default RootLayout;
