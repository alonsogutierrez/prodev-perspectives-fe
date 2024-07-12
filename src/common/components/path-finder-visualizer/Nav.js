import React from "react";

import { resetBoard } from "./Animations";

const Nav = (props) => {
  const {
    start,
    end,
    onChangeAlgorithm,
    algorithmsData,
    handleVisualizeAlgorithmBtn,
    onChangeMazeAndPatterns,
    allMazeAndPatterns,
    onChangeVelocity,
    velocitySelected,
    allVelocities,
    isToggleButtonOn,
    setGrid,
    setNodes,
    setAlgoDone,
    height,
    width,
    handleVisualizeMazeAndPatterns,
  } = props;
  const allAlgorithmsComboBoxData = [];
  Object.keys(algorithmsData).forEach((algorithmType) => {
    const algorithmSelecteds = algorithmsData[algorithmType];
    algorithmSelecteds.map((algorithmData) => {
      allAlgorithmsComboBoxData.push(algorithmData);
    });
  });
  const pathFinderData = {
    setGrid,
    setNodes,
    setAlgoDone,
    height,
    width,
  };
  const navMobileData = {
    algorithms: allAlgorithmsComboBoxData,
    velocities: allVelocities,
    mazeAndPatterns: allMazeAndPatterns,
  };
  return (
    <div className="container">
      <div className="row">
        <div className="mainmenu-wrapper d-xl-block">
          {/**
           * Desktop menu
           **/}
          <nav className="mainmenu-nav pathfinder-menu">
            {/**
             * Algorithm selection
             */}
            <ul className="mainmenu">
              <li style={{ width: "8vh" }}>Algorithm: </li>
              <li className="menu-item-has-children">
                <select
                  name="select_algorithm"
                  className="select_algorithm"
                  onChange={(e) => onChangeAlgorithm(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ color: "white", width: "24vh" }}
                  defaultValue="Algorithm"
                  disabled={!isToggleButtonOn}
                >
                  {allAlgorithmsComboBoxData.map((algoData) => {
                    const { id, value, name } = algoData;
                    return (
                      <option key={id} value={value} style={{ color: "black" }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id="btnClickVisualizeAlg"
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleVisualizeAlgorithmBtn()}
                  style={{ width: "14vh" }}
                >
                  Visualize{" "}
                  <i
                    className="fal fa-search"
                    style={{ marginLeft: "3px", fontWeight: "bold" }}
                  />
                </button>
              </li>
            </ul>
            <br />
            {/**
             * Velocity selection
             */}
            <ul className="mainmenu">
              <li style={{ width: "8vh" }}>Velocity: </li>
              <li className="menu-item-has-children">
                <select
                  name="select_velocity"
                  className="select_velocity"
                  onChange={(e) => onChangeVelocity(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ color: "white", width: "24vh" }}
                  defaultValue={velocitySelected}
                  disabled={!isToggleButtonOn}
                >
                  {allVelocities.map((vel) => {
                    const { id, name, value } = vel;
                    return (
                      <option key={id} value={value} style={{ color: "black" }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id="btnResetBoard"
                  type="submit"
                  className="btn btn-info"
                  onClick={() => resetBoard(pathFinderData, start, end)}
                  style={{ color: "white", width: "14vh" }}
                >
                  Reset{" "}
                  <i
                    className="fal fa-trash-restore"
                    style={{ marginLeft: "3px", fontWeight: "bold" }}
                  />
                </button>
              </li>
            </ul>
            <br></br>
            {/**
             * Maze and Patterns selection
             */}
            <ul className="mainmenu">
              <li style={{ width: "8vh" }}>Maze and Patterns: </li>
              <li className="menu-item-has-children">
                <select
                  name="select_algorithm"
                  className="select_algorithm"
                  onChange={(e) => onChangeMazeAndPatterns(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ color: "white", width: "24vh" }}
                  defaultValue="Recursive Division"
                  disabled={!isToggleButtonOn}
                >
                  {allMazeAndPatterns.map((maze) => {
                    const { id, name, value } = maze;
                    return (
                      <option key={id} value={value} style={{ color: "black" }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id="btnHandleMazeAndPatterns"
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => handleVisualizeMazeAndPatterns()}
                  style={{ color: "white", width: "14vh" }}
                >
                  Visualize{" "}
                  <i
                    className="fal fa-search"
                    style={{ marginLeft: "3px", fontWeight: "bold" }}
                  />
                </button>
              </li>
            </ul>
          </nav>
          {/**
           * Mobile menu
           **/}
          <nav className="mainmenu-nav pathfinder-menu-mobile">
            {/**
             * Algorithm selection
             */}
            {Object.entries(navMobileData).map(([key, value]) => (
              <>
                <div key={`key-${key}`}>
                  <ul className="mainmenu">
                    <li className="menu-item-has-children">
                      <select
                        name="select_algorithm"
                        className="select_algorithm"
                        onChange={(e) => {
                          if (key === "velocities") {
                            onChangeVelocity(e.target.value);
                          } else if (key === "mazeAndPatterns") {
                            onChangeMazeAndPatterns(e.target.value);
                          } else {
                            onChangeAlgorithm(e.target.value);
                          }
                        }}
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{ color: "white", width: "20vh" }}
                        defaultValue="Algorithm"
                        disabled={!isToggleButtonOn}
                      >
                        {value.map((algoData) => {
                          const { id, value, name } = algoData;
                          return (
                            <option
                              key={id}
                              value={value}
                              style={{ color: "black" }}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        id="btnClickVisualizeAlg"
                        type="submit"
                        className={
                          !key.includes("velocities")
                            ? "btn btn-primary"
                            : "btn btn-info"
                        }
                        onClick={(e) => {
                          if (key.includes("maze")) {
                            handleVisualizeMazeAndPatterns();
                          } else if (key.includes("velocities")) {
                            resetBoard(pathFinderData, start, end);
                          } else {
                            handleVisualizeAlgorithmBtn();
                          }
                        }}
                        style={{
                          width: "8vh",
                          marginLeft: "1vh",
                          color: "white",
                        }}
                      >
                        <i
                          className={
                            !key.includes("velocities")
                              ? "fal fa-search"
                              : "fal fa-trash-restore"
                          }
                          style={{ marginLeft: "0vh", fontWeight: "bold" }}
                        />
                      </button>
                    </li>
                  </ul>
                  <br />
                </div>
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
