import React, { FC } from "react";
import { nanoid } from "nanoid";
import { decode } from 'html-entities';

interface props {
    answerSelected: (chioceId: string, answer: string) => void
    question: string
    id: string
    incorrectAnswer: Array<string>
    correctAnswer: string
    selected: string
    showAnswer: boolean
}




const Choice:FC<props> = (props) => {

    const selectedChoiceClassname = "bg-selectedColor mr-3 rounded-xl px-5 py-2"
    const unselectedChoiceClassname = "border border-black mr-3 rounded-xl px-5 py-2"
    const selectedCorrect = "bg-correctGreen px-5 py-2 mr-3 rounded-xl border-none"
    const selectedIncorrect = "bg-incorrectRed px-5 py-2 mr-3 rounded-xl outline-none"

    const incorrectElems = props.incorrectAnswer.map(incorrectChoice => {
        const incorrectClassname = `
            ${props.selected === incorrectChoice ?  selectedChoiceClassname : unselectedChoiceClassname}
            ${(props.showAnswer && (props.selected === incorrectChoice)) && `${selectedIncorrect} opacity-50`}
            ${(props.showAnswer && (props.selected !== incorrectChoice)) && `${unselectedChoiceClassname} opacity-50`}
        `

        return (
            <button
                key={nanoid()}
                className={incorrectClassname}
                onClick={() => props.answerSelected(props.id, incorrectChoice)}
            >
                {decode(incorrectChoice)}
            </button>
        )
    })

    const correctClassname = `
            ${props.selected === props.correctAnswer ?  selectedChoiceClassname : unselectedChoiceClassname}
            ${props.showAnswer && selectedCorrect}
        `

    const correctElems = 
        <button
            key={nanoid()}
            className={correctClassname}
            onClick={() => props.answerSelected(props.id, props.correctAnswer)}
        >
            {decode(props.correctAnswer)}
        </button>

    const choicesArray = [...incorrectElems, correctElems].sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);

    return (
        <div className="border-b-2 border-black p-4">
            <p className="w-96 font-Karla font-bold text-base decoration-blackIndigo z-20">{decode(props.question)}</p>
            <div className="flex mt-3 font-Inter font-normal text-xs decoration-blackIndigo rounded-lg z-20">
                {choicesArray}
            </div>
        </div>
    )
} 

export default Choice
