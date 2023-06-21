// db connection


// inquirer prompts


const init = async () => {
    console.log("Welcome to the Employee Tracker!");
    try {
        await db.connect();
    } catch (err) {
        console.log(err);
    } 
};

