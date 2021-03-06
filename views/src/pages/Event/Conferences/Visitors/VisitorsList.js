// Importing core packages
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

// Importing custom components
import ConferenceTab from '../../../../Layout/ConferenceTab';
import EventTab from '../../../../Layout/EventTab';
import Loading from '../../../../Layout/Loading';

import VisitorsHeader from './VisitorsHeader';
import VisitorsBody from './VisitorsBody';

// Importing context files
import ConferenceContext from '../../../../context/conference/conferenceContext';

// VisitorsList component
const VisitorsList = () => {
    const conferenceContext = useContext(ConferenceContext);
    const visitors = conferenceContext.visitors;
    const loading = conferenceContext.confVisitorLoading;
    const tableCss = {
        width: "90%",
        minWidth: "600px",
        margin: "5px auto",
        textAlign: "left"
    };

    if (loading) {
        return (
            <>
                <EventTab tab='conference' />
                <ConferenceTab tab="visitor" />
                <center style={{ marginTop: "100px" }}>
                    <Loading color="info"></Loading>
                </center>
            </>
        );
    }

    if (!visitors) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <EventTab tab="conference" />
            <ConferenceTab tab="visitor" />
            { visitors && visitors.length > 0 ?
                <div style={{ overflowX: "auto" }}>
                    <table className="table" style={tableCss}>
                        <VisitorsHeader />
                        <tbody>
                            {visitors.map((visitor, i) =>
                                <VisitorsBody key={visitor._id} visitor={visitor} index={i + 1} onClick={visitor._id} />)}
                        </tbody>
                    </table>
                </div> : <center style={{ marginTop: "50px" }}>No visitors yet!</center>
            }
        </div>
    );
}

// Exporting VisitorsList component
export default VisitorsList;