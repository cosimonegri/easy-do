import React from 'react';
import { Button } from 'components/ProjectOptionsPopup/Button';
import styles from 'components/ProjectOptionsPopup/index.module.css'


const buttonsData = {
    firstSection: [
        {text: "Add project above", action: null},
        {text: "Add project below", action: null}
    ],
    secondSection: [
        {text: "Edit project", action: null},
        {text: "Share project", action: null},
        {text: "Add to favorites", action: null}
    ],
    thirdSection: [
        {text: "Duplicate project", action: null},
        {text: "Email tasks to this project", action: null},
        {text: "Project calendar feed", action: null}
    ],
    fourthSection: [
        {text: "Archive project", action: null},
        {text: "Delete project", action: "delete"}
    ]
}


export const ProjectOptionsPopup = ({ project }) => {

    const firstSection = buttonsData["firstSection"].map((buttonData, index) => {
        return (<li key={index}>
            <Button project={project} buttonData={buttonData} />
        </li>)
    });
    const secondSection = buttonsData["secondSection"].map((buttonData, index) => {
        return (<li key={index}>
            <Button project={project} buttonData={buttonData} />
        </li>)
    });
    const thirdSection = buttonsData["thirdSection"].map((buttonData, index) => {
        return (<li key={index}>
            <Button project={project} buttonData={buttonData} />
        </li>)
    });
    const fourthSection = buttonsData["fourthSection"].map((buttonData, index) => {
        return (<li key={index}>
            <Button project={project} buttonData={buttonData} />
        </li>)
    });


    return (
        <ul className={styles["options-container"]}>
            {firstSection}
            <hr className={styles["options-divider"]} />
            {secondSection}
            <hr className={styles["options-divider"]} />
            {thirdSection}
            <hr className={styles["options-divider"]} />
            {fourthSection}
        </ul>
    )
}