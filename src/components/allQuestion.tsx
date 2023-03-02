import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Choice from "./choices";
import yellowCircle from '../assets/yellowCircle.svg'
import blueCircle from '../assets/blueCircle.svg'




function AllQuestion({ setGameHandle }: {setGameHandle: () => void}) {

    const [ questionsList, setQuestionsList ] = useState<any[]>([])
    const [ correctCount, setCorrectCount ] = useState<number>(0)
    const [ isGameEnded, setIsGameEnded ] = useState<boolean>(false)

    const allSelected = questionsList.every(question => question.selected !== "")

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            const data = await res.json()
            return data.results
        }
        fetchData().then(questions => {
                return setQuestionsList(
                    questions.map((question: object) => {
                        return {
                            ...question,
                            id: nanoid(),
                            selected: "",
                            showAnswer: false
                        }
                    })
                )
            })
    }, [])

    useEffect(() => {
        if (questionsList.length !== 0 && allSelected){
            let correct = 0
            
            questionsList.forEach(question => {
                if (question.correct_answer === question.selected) {
                    correct++
                }
            })
            
            setCorrectCount(correct)


        }
    }, [questionsList])

    const answerSelected = (chioceId: string, answer: string) => {
        if (!isGameEnded) {
            setQuestionsList(prevList => (
                prevList.map(choice => (
                    choice.id === chioceId  ?
                    {...choice, selected: answer} :
                    choice
                ))
            )) 
        }
    }
    
    const choiceElems = questionsList.map(question => {
        return (
        <Choice
            key={question.id}
            id={question.id}
            question={question.question}
            incorrectAnswer={question.incorrect_answers}
            correctAnswer={question.correct_answer}
            selected={question.selected}
            answerSelected={answerSelected}
            showAnswer={question.showAnswer}
        />   
    )})

    const checkAnswer = () => {
        if (allSelected) {
            setIsGameEnded(true)
            setQuestionsList(prevList => (
                prevList.map(answer => (
                    {...answer, showAnswer: true}
                ))
            ))
        }
    }

    const restart = () => {
        setIsGameEnded(false)
        setGameHandle()
    }

    return (
        <>
         <img src={yellowCircle} alt="Yellow cricle" className='absolute right-0 max-md:hidden'/>
            <div className="flex flex-col items-center justify-center xl:h-screen">
                {questionsList.length === 0 ? (<p>Loading...</p>) :
                (
                    <>
                        <div className="w-xl max-sm:w-full z-50">
                            {choiceElems} 
                        </div>
                        <div className="flex items-center">
                            { isGameEnded && <p className="mr-5">You scored {correctCount}/5 correct answers</p> }
                            <button onClick={isGameEnded? restart : checkAnswer }
                            className="my-5 bg-indigoButton p-5 rounded-lg active:opacity-50 w-32 h-9 flex items-center justify-center text-sm text-center text-whiteText">
                                {(isGameEnded? 'Play again':'check answer')}
                            </button>
                        </div>
                    </>
                )}
            </div>
            <img src={blueCircle} alt="Blue cricle" className='absolute bottom-0 max-md:hidden'/>
        </>
    )
}

export default AllQuestion