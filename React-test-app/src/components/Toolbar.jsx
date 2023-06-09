import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Toolbar = () => {
  return (
    <div>
      <StyledToolbar>
        <div className="left">Home</div>
        <div className="right">
          <Link to="/login">Login</Link>
        </div>
      </StyledToolbar>
    </div>
  );
};

//styleds defined for the elements


const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1c0f;
  height: 60px;
  padding: 0 20px;
  
  .left {
    font-weight: bold;
    font-size: 18px;
    color: white;
  }
  
  .right {
    a {
      text-decoration: none;
      color: white;
      font-weight: bold;

    }
  }
`;

export default Toolbar;
