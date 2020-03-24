//CONTROLLER: managers/orchestrates the work using the service
import Convertor from "../services/Convertor";

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
    CalculateMission(essence, image) {
        const mission = Convertor.ReduceValue((essence + image), true);
        return mission;
    }
    CalculatePath(birthParts) {
        const birthNumbers = Convertor.ReduceValueElements(birthParts);
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
}

export default Calculator;