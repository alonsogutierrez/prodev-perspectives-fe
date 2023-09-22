import React from 'react';

const Nav = (props) => {
  const { onChangeAlgorithm } = props;
  return (
    <div className='container'>
      <div className='row'>
        <div className='mainmenu-wrapper d-xl-block'>
          <nav className='mainmenu-nav'>
            <ul className='mainmenu'>
              <li className='menu-item-has-children'>
                <select
                  name='select_algorithm'
                  className='select_algorithm'
                  onChange={(e) => onChangeAlgorithm(e.target.value)}
                  tabIndex={-1}
                  aria-hidden='true'
                  style={{ color: 'white' }}
                  defaultValue='Algorithm'
                >
                  <option value='Algorithm'>Algorithm</option>
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
                  type='submit'
                  className='btn btn-primary'
                  onClick={() => handleVisualizeAlgorithmBtn()}
                >
                  Visualize algorithm{' '}
                  <i
                    className='fal fa-search'
                    style={{ marginLeft: '3px', fontWeight: 'bold' }}
                  />
                </button>
              </li>
            </ul>
            <br />
            <ul className='mainmenu'>
              <li className='menu-item-has-children'>
                <select
                  name='select_algorithm'
                  className='select_algorithm'
                  onChange={(e) => onChangeMazeAndPatterns(e.end.value)}
                  tabIndex={-1}
                  aria-hidden='true'
                  style={{ color: 'white' }}
                  defaultValue='Maze & patterns'
                >
                  <option value='Maze & patterns'>Maze & patterns</option>
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
                  type='submit'
                  className='btn btn-info'
                  onClick={() => resetBoard()}
                  style={{ color: 'white' }}
                >
                  Reset board{' '}
                  <i
                    className='fal fa-trash-restore'
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
