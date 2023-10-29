import React from 'react';

import { resetBoard } from './Animations';

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
  return (
    <div className='container'>
      <div className='row'>
        <div className='mainmenu-wrapper d-xl-block'>
          <nav className='mainmenu-nav'>
            <ul className='mainmenu'>
              <li style={{ width: '8vh' }}>Algorithm: </li>
              <li className='menu-item-has-children'>
                <select
                  name='select_algorithm'
                  className='select_algorithm'
                  onChange={(e) => onChangeAlgorithm(e.target.value)}
                  tabIndex={-1}
                  aria-hidden='true'
                  style={{ color: 'white', width: '24vh' }}
                  defaultValue='Algorithm'
                  disabled={!isToggleButtonOn}
                >
                  {allAlgorithmsComboBoxData.map((algoData) => {
                    const { id, value, name } = algoData;
                    return (
                      <option key={id} value={value} style={{ color: 'black' }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id='btnClickVisualizeAlg'
                  type='submit'
                  className='btn btn-primary'
                  onClick={() => handleVisualizeAlgorithmBtn()}
                  style={{ width: '14vh' }}
                >
                  Visualize{' '}
                  <i
                    className='fal fa-search'
                    style={{ marginLeft: '3px', fontWeight: 'bold' }}
                  />
                </button>
              </li>
            </ul>
            <br />

            <ul className='mainmenu'>
              <li style={{ width: '8vh' }}>Velocity: </li>
              <li className='menu-item-has-children'>
                <select
                  name='select_velocity'
                  className='select_velocity'
                  onChange={(e) => onChangeVelocity(e.target.value)}
                  tabIndex={-1}
                  aria-hidden='true'
                  style={{ color: 'white', width: '24vh' }}
                  defaultValue={velocitySelected}
                  disabled={!isToggleButtonOn}
                >
                  {allVelocities.map((vel) => {
                    const { id, name, value } = vel;
                    return (
                      <option key={id} value={value} style={{ color: 'black' }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id='btnResetBoard'
                  type='submit'
                  className='btn btn-info'
                  onClick={() => resetBoard(pathFinderData, start, end)}
                  style={{ color: 'white', width: '14vh' }}
                >
                  Reset{' '}
                  <i
                    className='fal fa-trash-restore'
                    style={{ marginLeft: '3px', fontWeight: 'bold' }}
                  />
                </button>
              </li>
            </ul>
            <br></br>

            <ul className='mainmenu'>
              <li style={{ width: '8vh' }}>Maze and Patterns: </li>
              <li className='menu-item-has-children'>
                <select
                  name='select_algorithm'
                  className='select_algorithm'
                  onChange={(e) => onChangeMazeAndPatterns(e.target.value)}
                  tabIndex={-1}
                  aria-hidden='true'
                  style={{ color: 'white', width: '24vh' }}
                  defaultValue='Recursive Division'
                  disabled={!isToggleButtonOn}
                >
                  {allMazeAndPatterns.map((maze) => {
                    const { id, name, value } = maze;
                    return (
                      <option key={id} value={value} style={{ color: 'black' }}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </li>
              <li>
                <button
                  id='btnHandleMazeAndPatterns'
                  type='submit'
                  className='btn btn-primary'
                  onClick={() => handleVisualizeMazeAndPatterns()}
                  style={{ color: 'white', width: '14vh' }}
                >
                  Visualize{' '}
                  <i
                    className='fal fa-search'
                    style={{ marginLeft: '3px', fontWeight: 'bold' }}
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
