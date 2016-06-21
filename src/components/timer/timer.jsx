import React from 'react';

function formatTime() {

}

export default function Timer(props) {
  return (
    <span>{formatTime(props.timestamp)}</span>
  );
}
