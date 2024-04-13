import React from 'react'
import { QUESTIONS } from '../questions'

interface Props {
    answers : Record<number, string>
    handleClick : (que:number, ans:boolean) => void
}

function QuestionsView({answers, handleClick} : Readonly<Props>) {

    const style = {
    heading: {
        textAlign: "center",
        textDecoration: "underline"
    } as React.CSSProperties,
    questionContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"
    } as React.CSSProperties,
    buttonWrapper: {
        display: "flex",
        gap: "20px",
        justifyContent: "flex-end"
    } as React.CSSProperties,
    btn: {
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: 700
    } as React.CSSProperties,
    yesBtn: {
        border: "2px solid #40a226",
        backgroundColor: "#7ed65e"
    } as React.CSSProperties,
    noBtn: {
        border: "2px solid #dd1721",
        backgroundColor: "#fe5f5b"
    } as React.CSSProperties
}

    return (
        <div>
            <h1 style={{textAlign:"center", textDecoration:"underline"}}>Questions</h1>
            {
                Object.values(QUESTIONS).map((que, index) => {
                    return (
                        <div key={`question-${que}`} style={style.questionContainer}>
                            <h3>{que}</h3>
                            <div style={style.buttonWrapper}>
                                {
                                    answers[index + 1] === null ?
                                        <>
                                            <button onClick={() => handleClick(index + 1, true)} style={{ ...style.yesBtn, ...style.btn }}>Yes</button>
                                            <button onClick={() => handleClick(index + 1, false)} style={{ ...style.noBtn, ...style.btn }}>No</button>
                                        </> :
                                        <h4>Thanks for response</h4>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QuestionsView