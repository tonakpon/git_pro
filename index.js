import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random"; // Import correct

const path = ".data.json";

const makeCommits = (n) => {
    if (n === 0) {
        simpleGit().push(); // Pousse les commits après la dernière exécution
        return;
    }

    const x = random.int(0, 54); // Correction de random.default.int()
    const y = random.int(0, 6);

    const date = moment()
        .subtract(1, "years")
        .add(1, "days")
        .add(x, "weeks")
        .add(y, "days")
        .format();

    const data = { date };

    console.log(`Commit ${n}:`, data);

    jsonfile.writeFile(path, data, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture du fichier :", err);
            return;
        }

        simpleGit()
            .add([path])
            .commit(date, { "--date": date })
            .then(() => makeCommits(n - 1)) // Appel récursif après chaque commit
            .catch((err) => console.error("Erreur lors du commit :", err));
    });
};

makeCommits(100);
