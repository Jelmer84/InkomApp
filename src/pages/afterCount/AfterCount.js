import React, {useContext, useState} from "react";
import styles from "./AfterCount.module.css"
import CountTable from "../../components/CountForm/CountTable";
import RemarksContainer from "../../components/RemarksContainer/RemarksContainer";
import Button from "../../components/Button/Button";
import {initialStateDrinks, initialStateKegs, initialStateTanks} from "../../constants/initialStateDrinks";
import {postEventInventory} from "../../network/network";
import {AuthContext} from "../../context/AuthContext";

function AfterCount() {
    const [selectedWeekday, setSelectedWeekday] = useState('');
    const [selectedInkomEvent, setSelectedInkomEvent] = useState('');
    const [selectedStudentParty, setSelectedStudentParty] = useState('');

    const [bottles, setBottles] = useState(initialStateDrinks);
    const [crates, setCrates] = useState(initialStateDrinks);
    const [kegs, setKegs] = useState(initialStateKegs);
    const [tanks, setTanks] = useState(initialStateTanks);

    const [totalCrates, setTotalCrates] = useState(0);
    const [totalBottles, setTotalBottles] = useState(0);
    const [totalKegs, setTotalKegs] = useState(0);
    const [totalTanks, setTotalTanks] = useState(0);

    const [remarks, toggleRemarks] = useState(false);
    const [contentRemarks, setContentRemarks] = useState()

    const [formSubmitSucces, setFormSubmitSucces] = useState(false)
    const [errorMsg, setErrorMsg] = useState();
    const {user} = useContext(AuthContext)

    async function onFormSubmit(event) {
        event.preventDefault()
        const eventDetails = {
            eventId: selectedInkomEvent,
            studentPartyId: selectedStudentParty.studentParty,
            stage: 1, // after count
            submitted: user.id,
            organisationRemarks: contentRemarks,
            data: {
                selectedWeekday: selectedWeekday,
                crates: crates,
                bottles: bottles,
                kegs: kegs,
                tanks: tanks,
                totalCrates: totalCrates,
                totalBottles: totalBottles,
                totalKegs: totalKegs,
                totalTanks: totalTanks
            }
        }
        try {
            await postEventInventory(eventDetails)
        } catch (e) {
            if (e.response.status === 400) {
                // this has already been submitted
                setErrorMsg(e.response.data.message)
            }
            console.error(e);
        }
        setFormSubmitSucces(true);
    }

    return (
        <>
            {!formSubmitSucces && <form onSubmit={onFormSubmit}>
                <div className={styles["after-container"]}>
                    <div className={styles["after-countTable"]}>
                        <CountTable
                            nameList="Na"
                            selectedWeekday={selectedWeekday}
                            setSelectedWeekday={setSelectedWeekday}
                            selectedInkomEvent={selectedInkomEvent}
                            setSelectedInkomEvent={setSelectedInkomEvent}
                            selectedStudentParty={selectedStudentParty}
                            setSelectedStudentParty={setSelectedStudentParty}

                            bottles={bottles}
                            setBottles={setBottles}
                            crates={crates}
                            setCrates={setCrates}
                            kegs={kegs}
                            setKegs={setKegs}
                            tanks={tanks}
                            setTanks={setTanks}

                            totalCrates={totalCrates}
                            setTotalCrates={setTotalCrates}
                            totalBottles={totalBottles}
                            setTotalBottles={setTotalBottles}
                            totalKegs={totalKegs}
                            setTotalKegs={setTotalKegs}
                            totalTanks={totalTanks}
                            setTotalTanks={setTotalTanks}
                        />
                    </div>

                    <div className={styles["after-button"]}>
                        <RemarksContainer
                            remarks={remarks}
                            toggleRemarks={toggleRemarks}
                            contentRemarks={contentRemarks}
                            setContentRemarks={setContentRemarks}
                        />

                        <Button
                            name="Opslaan"
                            type="submit"
                            id="buttonSubmit"
                            disabled={!selectedWeekday || !selectedInkomEvent || !selectedStudentParty}
                        />

                        {(!selectedWeekday || !selectedInkomEvent || !selectedStudentParty) &&
                        <p>Vul de datum, het evenement en de studentenpartij in!</p>}
                    </div>
                </div>
            </form>}
            {formSubmitSucces && !errorMsg && <p>De telling is opgeslagen!</p>}
            {formSubmitSucces && errorMsg && <p>{errorMsg}!</p>}
        </>
    );
}

export default AfterCount


