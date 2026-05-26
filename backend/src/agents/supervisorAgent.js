const supervisorAgent = async (
    state
) => {

    console.log(
        "Supervisor Agent Running"
    );

    const query =
        state.query.toLowerCase();

    let useWeb = false;

    let useRetrieval = true;

    if (
        query.includes("latest") ||
        query.includes("today") ||
        query.includes("current") ||
        query.includes("pricing")
    ) {

        useWeb = true;

        useRetrieval = false;
    }

    if (
        query.includes("my") ||
        query.includes("project") ||
        query.includes("resume")
    ) {

        useWeb = true;

        useRetrieval = true;
    }

    return {

        useWeb,

        useRetrieval
    };
};

export default supervisorAgent;