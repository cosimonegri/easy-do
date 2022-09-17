import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import { closeSharePopup } from "redux/popups.slice";

import { AuthProvider } from "contexts/auth-context";
import { DataProvider } from "contexts/data-context";
import { RoutesList } from "routes";

import TaskPopup from "components/TaskPopup";
import ProjectPopup from "components/ProjectPopup";
import SharePopup from "components/SharePopup";

import { grey1 } from "utils/constants/constants";

// se non riesce a recuperare i dati dal server
// 1. lanciare un alert (bottone per riprovare? )
// 2. fare entrare l'utente come opsite (può usare l'app ma i dati non verranno scritti sul server,
// e inoltre verranno persi al refresh della pagina)

// impedire creazione 2 progetti con stesso nome  ???
// possibilità di creare task senza data (al posto) di tomorrow in home ???
// sistemare listener users
// sistemare auth context
// POTER AGGIORNARE TASK E PROGETTI + alcuni dati immodificabili con firestore rules
// chiedere se sei sicuro prima di eliminare un progetto con un toast
// grafica dei titolini in scheduled page
// cambiare titolo a Scheduled ???
// move all functions in Task e SingleProject in a parent component

const App = () => {
  const dispatch = useDispatch();
  const showSharePopup = useSelector((state) => state.popups.showSharePopup);

  useEffect(() => {
    document.body.style.backgroundColor = grey1;
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <RoutesList />

        <TaskPopup />
        <ProjectPopup />
        <SharePopup
          show={showSharePopup}
          close={() => dispatch(closeSharePopup())}
        />

        <ToastContainer />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
