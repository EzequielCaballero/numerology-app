//CONTROLLER: managers/orchestrates the work using the service
import Convertor from "../services/Convertor";
import Stage from "../entity/Stage";

class Calculator {

    //RECORD
    _record = {
        "name": [],
        "essence": [],
        "image": [],
        "birth": [],
        "path": []
    }

    //METHODS
    FormatName(fullname) {
        const newFormat = Convertor.FormatNameToArray(fullname);
        this._record.name = newFormat;
        return newFormat;
    }
    FormatBirth(birth) {
        const newFormat = Convertor.FormatDateToArray(birth);
        this._record.birth = newFormat;
        return newFormat;
    }
    CalculateImage(nameParts) {
        const nameConsonants = Convertor.TakeNameConsonants(nameParts);
        const consonantNumbers = Convertor.MatchNumericKeys(nameConsonants);
        const nestedArrayReduced = Convertor.ReduceNestedArray(consonantNumbers);
        const nestedValueReduced = Convertor.ReduceValueElements(nestedArrayReduced, true);
        const arrayReduced = Convertor.ReduceArray(nestedValueReduced);
        const image = Convertor.ReduceValue(arrayReduced, true);

        //REGISTER ACTIONS
        this._record.image.push(nameConsonants);
        this._record.image.push(consonantNumbers);
        this._record.image.push(nestedArrayReduced);
        if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
            this._record.image.push(nestedValueReduced);
        if (arrayReduced !== image)
            this._record.image.push(arrayReduced);
        this._record.image.push(image);

        return image;
    }
    CalculateEssence(nameParts) {
        const nameVowels = Convertor.TakeNameVowels(nameParts);
        const vowelNumbers = Convertor.MatchNumericKeys(nameVowels);
        const nestedArrayReduced = Convertor.ReduceNestedArray(vowelNumbers);
        const nestedValueReduced = Convertor.ReduceValueElements(nestedArrayReduced, true);
        const arrayReduced = Convertor.ReduceArray(nestedValueReduced);
        const essence = Convertor.ReduceValue(arrayReduced, true);

        //REGISTER ACTIONS
        this._record.essence.push(nameVowels);
        this._record.essence.push(vowelNumbers);
        this._record.essence.push(nestedArrayReduced);
        if (JSON.stringify(nestedValueReduced) !== JSON.stringify(nestedArrayReduced))
            this._record.essence.push(nestedValueReduced);
        if (arrayReduced !== essence)
            this._record.essence.push(arrayReduced);
        this._record.essence.push(essence);

        return essence;
    }
    CalculateMission(essence, image) {
        const mission = Convertor.ReduceValue((essence + image), true);
        return mission;
    }
    CalculatePath(birthParts) {
        const birthNumbers = Convertor.ReduceValueElements(birthParts, true);
        const arrayReduced = Convertor.ReduceArray(birthNumbers);
        const path = Convertor.ReduceValue(arrayReduced, true);

        //REGISTER ACTIONS
        this._record.path.push(birthNumbers);
        if (arrayReduced !== path)
            this._record.path.push(arrayReduced);
        this._record.path.push(path);

        return path;
    }
    CalculatePersonalKey(birthParts) {
        const personalKey = Convertor.MatchPersonalKeys(birthParts);
        return personalKey;
    }
    CalculatePotential(mission, path) {
        const potentialNumber = Convertor.ReduceValue((mission + path), true);
        return potentialNumber;
    }

    //To be finish...
    CalculateKarma(essence, mission, path) {

    }
    CalculateKarmaLesson(mission, path) {
        const possibleKarma = Convertor.ReduceValue((mission + path), true);
        return possibleKarma;
    }
    CalculateStages(birthParts, path) {
        const base_number = 36;
        const default_duration = 9;
        const birthReduced = Convertor.ReduceValueElements(birthParts, true);
        let stages = [];
        //STAGE 1
        const stage_1 = new Stage();
        stage_1.num = 1;
        stage_1.from = 0;
        stage_1.to = base_number - path;
        stage_1.value = Convertor.ReduceValue((birthReduced[1] + birthReduced[0]), true);
        stages.push(stage_1);
        //STAGE 2
        const stage_2 = new Stage();
        stage_2.num = 2;
        stage_2.from = (stages[0].to + 1);
        stage_2.to = (stage_2.from + default_duration);
        stage_2.value = Convertor.ReduceValue((birthReduced[0] + birthReduced[2]), true);
        stages.push(stage_2);
        //STAGE 3
        const stage_3 = new Stage();
        stage_3.num = 3;
        stage_3.from = (stages[1].to + 1);
        stage_3.to = (stage_3.from + default_duration);
        stage_3.value = Convertor.ReduceValue((stages[0].value + stages[1].value), true);
        stages.push(stage_3);
        //STAGE 4
        const stage_4 = new Stage();
        stage_4.num = 4;
        stage_4.from = (stages[2].to + 1);
        stage_4.to = (stage_4.from + default_duration);
        stage_4.value = Convertor.ReduceValue((birthReduced[1] + birthReduced[2]), true);
        stages.push(stage_4);

        return stages;
    }
    CalculatePersonalYear(birthParts) {
        const actualYear = new Date().getFullYear();
        const values = [birthParts[0], birthParts[1], actualYear];
        const valuesReduced = Convertor.ReduceValueElements(values, true);
        const uniqueValue = Convertor.ReduceArray(valuesReduced);
        const finalValue = Convertor.ReduceValue(uniqueValue, true);
        return finalValue;
    }
    CalculatePersonalMonth(personalYear) {
        const actualMonth = new Date().getMonth() + 1;
        const finalValue = Convertor.ReduceValue((personalYear + actualMonth), true);
        return finalValue;
    }
    CalculateAgeDigit(birthParts) {
        const birthDate = new Date(`${birthParts[2]}-${birthParts[1]}-${birthParts[0]}`);
        const age = Convertor.GetAge(birthDate);
        let values = [age, (age + 1)];
        const valuesReduced = Convertor.ReduceValueElements(values, true);
        const uniqueValue = Convertor.ReduceArray(valuesReduced);
        const finalValue = Convertor.ReduceValue(uniqueValue, true);
        return finalValue;
    }
}

export default Calculator;