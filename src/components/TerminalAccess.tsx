import React from "react";
import Terminal from 'terminal-in-react';
import PseudoFileSystem from 'terminal-in-react-pseudo-file-system-plugin';


export function TerminalAccess({}) {

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
          plugins={[
            new PseudoFileSystem(),
          ]}
          commands={{
          }}
          
          msg='Hi there, welcome to my thought bubble. Type `help` for the list of commands'
        />
      </div>
  );
}
