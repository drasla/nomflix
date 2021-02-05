import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component{
    state = {
        topRated: null,
        popular: null,
        airringToday: null,
        error: null,
        loading: true
    };

    render() {
        const { topRated, popular, airringToday, error, loading } = this.state;
        return(
            <TVPresenter topRated={topRated} popular={popular} airringToday={airringToday} error={error} loading={loading} />
        );
    };
}
