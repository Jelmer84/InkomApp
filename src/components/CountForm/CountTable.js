import React from "react";
import styles from "./CountTable.module.css"
import DropdownWeekdayEvent from "../dropdowncount/DropdownWeekday-Event/DropdownWeekday-Event";
import DropdownStudentParty from "../dropdowncount/Studentpartydropdown/DropdownStudentParty";
import reduceTotals from "../../helpers/reduceTotals/reduceTotals";
import {initialStateDrink, initialStateKeg, initialStateTank} from "../../constants/initialStateDrinks";

function CountTable({
                        nameList,
                        setSelectedWeekday,
                        setSelectedInkomEvent,
                        setSelectedStudentParty,

                        bottles, setBottles,
                        crates, setCrates,
                        kegs, setKegs,
                        tanks, setTanks,

                        totalCrates, setTotalCrates,
                        totalBottles, setTotalBottles,
                        totalKegs, setTotalKegs,
                        totalTanks, setTotalTanks
                    }) {
    const beverages = Object.keys(bottles[0])
    const beveragesCrates = Object.keys(crates[0])
    const beveragesKegs = Object.keys(kegs[0])
    const beveragesTanks = Object.keys(tanks[0])

    function updateItems(event, itemIndex, items, setItems, setTotalItems, initialStateItem) {
        const updatedTanksState = items.map((newItems, index) => {
            if (index === itemIndex) {
                return {...newItems, [event.target.name]: parseFloat(event.target.value)}
            } else {
                return newItems
            }
        })
        setItems(updatedTanksState)
        setTotalItems(reduceTotals(updatedTanksState, initialStateItem))
    }

    return (
        <>
            <div className={styles.dropdownLists}>
                <DropdownWeekdayEvent
                    selectedWeekday={selectedWeekday => setSelectedWeekday(selectedWeekday)}
                    selectedInkomEvent={selectedInkomEvent => setSelectedInkomEvent(selectedInkomEvent)}
                />
                <DropdownStudentParty
                    selectedStudentParty={selectedStudentParty => setSelectedStudentParty(selectedStudentParty)}
                />
            </div>

            <table border="2">
                <thead>
                <tr>
                    <th className={styles.text} colSpan="17">Tellijst {nameList}</th>
                </tr>
                <tr>
                    <th className={styles.headerOne} rowSpan="2">Drank / Per krat / Inhoudsmaat</th>
                    {bottles.map((fridge, index) => {
                        return <th key={index} className={styles.headerOne} colSpan="2">Koeling {index + 1}</th>
                    })}
                    <th className={styles.headerOne} colSpan="2">Totaal</th>
                </tr>
                <tr>
                    {bottles.map((fridge, index) => {
                        return <React.Fragment key={index}>
                            <th className={styles.headerTwo}>Kratten</th>
                            <th className={styles.headerTwo}>Flessen</th>
                        </React.Fragment>
                    })}
                    <th className={styles.headerTwo}>Kratten</th>
                    <th className={styles.headerTwo}>Flessen</th>
                </tr>
                </thead>

                <tbody>
                {beverages.map((beverageName, beverageIndex) => {
                    return <tr key={beverageIndex}>
                        <td className={styles.text}>{beverages[beverageIndex]}</td>
                        {bottles.map((fridge, index) => {
                            return <React.Fragment key={index}>
                                <td>
                                    <input
                                        key={index}
                                        min="0"
                                        className={styles.beverage}
                                        name={beveragesCrates[beverageIndex]}
                                        placeholder="0"
                                        type="number"
                                        value={crates[index][beveragesCrates[beverageIndex]]}
                                        onChange={(event) => updateItems(event, index, crates, setCrates, setTotalCrates, initialStateDrink)}
                                    />
                                </td>

                                <td>
                                    <input
                                        min="0"
                                        className={styles.beverage}
                                        name={beverages[beverageIndex]}
                                        placeholder="0"
                                        type="number"
                                        value={fridge[beverages[beverageIndex]]}
                                        onChange={(event) => updateItems(event, index, bottles, setBottles, setTotalBottles, initialStateDrink)}/>
                                </td>
                            </React.Fragment>
                        })}

                        <td>{totalCrates[beverageName] || 0}</td>
                        <td>{totalBottles[beverageName] || 0}</td>
                    </tr>
                })}

                <tr>
                    <th className={styles.headerOne}>Fusten</th>
                    {kegs.map((fridge, index) => {
                        return <th key={index} className={styles.headerOne}>Fusten {index + 1}</th>
                    })}
                    <th className={styles.headerOne}>Totaal</th>
                </tr>
                {beveragesKegs.map((kegName, beverageIndex) => {
                    return <tr key={beverageIndex}>
                        <td className={styles.text}>{beveragesKegs[beverageIndex]}</td>
                        {kegs.map((fridge, index) => {
                            return <React.Fragment key={index}>
                                <td key={beveragesKegs}>
                                    <input
                                        min="0"
                                        className={styles.beverage}
                                        name={beveragesKegs[beverageIndex]}
                                        placeholder="0"
                                        type="number"
                                        step="any"
                                        value={kegs[index][beveragesKegs[beverageIndex]]}
                                        onChange={(event) => updateItems(event, index, kegs, setKegs, setTotalKegs, initialStateKeg)}/>
                                </td>
                            </React.Fragment>
                        })}
                        <td>{totalKegs[kegName] || 0}</td>
                    </tr>
                })}

                <tr>
                    <th className={styles.headerOne}>Tankbier</th>
                    {tanks.map((fridge, index) => {
                        return <th key={index} className={styles.headerOne}>Tankbier {index + 1}</th>
                    })}
                    <th className={styles.headerOne}>Totaal</th>
                </tr>
                {beveragesTanks.map((tankName, beverageIndex) => {
                    return <tr key={beverageIndex}>
                        <td className={styles.text}>{beveragesTanks[beverageIndex]}</td>
                        {tanks.map((fridge, index) => {
                            return <td key={index}>
                                <input
                                    min="0"
                                    className={styles.beverage}
                                    name={beveragesTanks[beverageIndex]}
                                    placeholder="0"
                                    type="number"
                                    value={tanks[index][beveragesTanks[beverageIndex]]}
                                    onChange={(event) => updateItems(event, index, tanks, setTanks,
                                        setTotalTanks, initialStateTank)}/>
                            </td>
                        })}
                        <td>{totalTanks[tankName] || 0}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default CountTable
