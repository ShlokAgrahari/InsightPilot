import generateAnswer from
"../services/generateAnswer.js";

const answerAgent = async (
    state
) => {

    console.log(
        "Answer Agent Running"
    );

    const answer =
        await generateAnswer(

            state.query,

            state.rerankedChunks
        );

    return {

        finalAnswer: answer
    };
};

export default answerAgent;