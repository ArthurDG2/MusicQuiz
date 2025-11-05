"use client";
import { useRouter } from "next/navigation";
import { MusicquizLogo } from "./components/MusicquizLogo/Index";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import pageStyles from "./page.module.css";

export default function Page() {
const router = useRouter();

    return (
        <main className={pageStyles.screen} style={{ flex: 1 }}>
            <section className={pageStyles.container}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "24px"
                }}
                >
                    <MusicquizLogo />
                </div>

                <Card headerTitle="Teste suas habilidades">
                    <p style={{ marginBottom: "32px" }}>
                        Teste os seus conhecimentos sobre o mundo da musica e divirta-se criando o seu MusicQuiz!
                    </p>
                    <form
                    onSubmit={(event) => {
                        event.preventDefault();

                        const name = "Mario";
                        router.push(`/game?player=${name}`)
                    }}
                    >
                        <div style={{marginBottom: "24px"}}>
                        <input
                        type = "text"
                        placeholder="Digite o seu nome para jogar"
                        name="playerName" />
                        </div>
                        <button>
                            Jogar
                        </button>
                    </form>
                </Card>
                <Footer />
            </section>
        </main>
    )
}