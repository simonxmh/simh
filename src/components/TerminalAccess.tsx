import React from "react";
import Terminal from 'terminal-in-react';

export function TerminalAccess({}) {
  const showMsg = () => 'Hello World'

  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Terminal
          color='green'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commands={{
            'open-google': () => window.open('https://www.google.com/', '_blank'),
            showmsg: {...showMsg} ,
            popup: () => alert('Terminal in React')
          }}
          
          msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
        />
      </div>
  );
}
