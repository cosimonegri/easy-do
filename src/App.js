import React from "react";
import { AuthProvider } from "contexts/auth-context";
import { DataProvider } from "contexts/data-context";
import { RoutesList } from "routes";

import { grey1 } from "utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "style.css";
// import "reactjs-popup/dist/index.css";
// import "react-datepicker/dist/react-datepicker.css";

// TODO: creare email supporto per il progetto e metterla sua firebase al posto della mia

// se non riesce a recuperare i dati dal server
// 1. lanciare un alert (bottone per riprovare? )
// 2. fare entrare l'utente come opsite (può usare l'app ma i dati non verranno scritti sul server,
// e inoltre verranno persi al refresh della pagina)

// sistemare ottenimento

// SIDEBAR: aggiungere archivio progetti (e quindi sistemare altezza del menu che compare a mo di tenda)
// SIDEBAR: sistemare conteggio task today
// SIDEBAR: aggiungere conteggio task per ogni progetto
// HELPERS: sistemare drag and drop progetti
// HEADER: handle errors in the logout process

const App = () => {
  document.body.style.backgroundColor = grey1;

  return (
    <AuthProvider>
      <DataProvider>
        <RoutesList />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
