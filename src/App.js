import React from "react";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "contexts/auth-context";
import { DataProvider } from "contexts/data-context";
import { RoutesList } from "routes";

import { grey1 } from "utils/constants/constants";

// TODO: creare email supporto per il progetto e metterla sua firebase al posto della mia

// se non riesce a recuperare i dati dal server
// 1. lanciare un alert (bottone per riprovare? )
// 2. fare entrare l'utente come opsite (può usare l'app ma i dati non verranno scritti sul server,
// e inoltre verranno persi al refresh della pagina)

// impedire creazione 2 progetti con stesso nome
// possibilità di creare task senza data

// chiedere se sei sicuro prima di eliminare un progetto con un toast

const App = () => {
  document.body.style.backgroundColor = grey1;

  return (
    <AuthProvider>
      <DataProvider>
        <RoutesList />
        <ToastContainer />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
