"use client";
import React from "react";
import { useRouter } from "next/navigation"
import { MusicquizLogo } from "../components/MusicquizLogo/Index";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import pageStyles from "../page.module.css"
import config from "../../config.json"
import { Alternative } from "../components/Alternative";


const questions = config.questions;

const anwserStates = {
    DEFAULT: "DEFAULT",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
} as const

export default function GameScreen() {
    const router = useRouter();
    const [anwserState, setAnwserState] = React.useState<keyof typeof anwserStates>(anwserStates.DEFAULT);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [userAnswers, setUserAnswers] = React.useState([]);
    const questionNumber = currentQuestion + 1;
    const question = questions[currentQuestion];
    const isLastQuestion = questionNumber === questions.length;

    React.useEffect(() => {
        if (isLastQuestion) {
            const totalPoints = userAnswers.reduce((_totalPoints, currentAnwser) => {
                if (currentAnwser === true) return _totalPoints + 1;
                return _totalPoints
            }, 0);

            // Desafio: Pegar o nome do usuário definindo na tela anterior e mostrar na tela final
            alert(`Você conclui o desafio!" e acertou ${totalPoints}`);
            router.push("/");
            return;
        }

    }, [userAnswers])

    return (
        <main className={pageStyles.screen}
            style={{
                flex: 1,
                backgroundImage: `url("${question.image}")`,
            }}>
            <section className={pageStyles.container}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "24px"
                }}
                >
                    <MusicquizLogo />
                </div>
                <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}>
                    <h1>
                        {question.title}
                    </h1>
                    <p>{question.description}</p>
                    <form
                        style={{
                            marginTop: "24px",
                        }}
                        onSubmit={(event) => {
                            //Desafio: Quebrar o onsubmit em funções menores
                            event.preventDefault();
                            const $questionInfo = event.target as HTMLFormElement;
                            const formData = new FormData($questionInfo);
                            const { alternative } = Object.fromEntries(formData.entries())
                            const isCorrectAnwser = alternative === question.anwser;
                            if (isCorrectAnwser) {
                                setUserAnswers([
                                    ...userAnswers,
                                    true
                                ]);
                                setAnwserState(anwserStates.SUCCESS);
                            }
                            if (!isCorrectAnwser) {
                                setUserAnswers([
                                    ...userAnswers,
                                    false
                                ]);
                                setAnwserState(anwserStates.ERROR)
                            }
                            setTimeout(() => {
                                if (isLastQuestion) return;
                                
                                setCurrentQuestion(currentQuestion + 1);
                                setAnwserState(anwserStates.DEFAULT)
                            }, 2 * 1000)

                        }}>
                        {question.alternatives.map((alternative, index) => (
                            <div
                                key={alternative + index}
                                style={{
                                    marginBottom: "8px",
                                }}
                            >
                                <Alternative
                                    label={alternative}
                                    order={index}
                                />
                            </div>
                        ))}
                        {anwserState === anwserStates.DEFAULT && (
                            <button>
                                Confirmar
                            </button>
                        )}
                        <p style={{ textAlign: "center" }}>
                            {anwserState === anwserStates.ERROR && (
                                "❌"
                            )}
                            {anwserState === anwserStates.SUCCESS && (
                                "✅"
                            )}
                        </p>
                    </form>
                </Card>
                <Footer />
            </section>
        </main>
    );
}

// Criar um componente genérico que representa nossa tela