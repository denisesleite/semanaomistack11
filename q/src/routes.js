import React from 'react';

//o que precisa ficar na volta de todas as rotas
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    return (
        // BrowserRouter precisa estar na volta de tudo
        <BrowserRouter>
            {/* //Switch uma rota executada por momento */}
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}