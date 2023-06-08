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

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  height: 60px;
  padding: 0 20px;
  
  .left {
    font-weight: bold;
    font-size: 18px;
  }
  
  .right {
    a {
      text-decoration: none;
      color: #333;
      font-weight: bold;
    }
  }
`;

export default Toolbar;
