class SubmitFunction {
    check() {
        let formIsValid = true;
        let data = [];
        const blocklyData: any = localStorage.getItem('code')
        data = JSON.parse(blocklyData)
        const formTitle = (document.getElementById('title') as HTMLInputElement).innerText;
        const title = "data" + formTitle
        const saveField = []
        for (const x in data) {
            if(data[x].id===formTitle){
            const savaedata = {
                fieldName: data[x].fieldName, type: data[x].type,
                regexp: data[x].regexp, TextInput: data[x].TextInput
            }
            saveField.push(savaedata)   
        }   
        
        }
        localStorage.setItem(title, JSON.stringify(saveField))
        let validation = []
        const getData: any = localStorage.getItem(title);
        validation = JSON.parse(getData)
        for (const x in validation) {
        //    if(validation.hasOwnProperty(x)){}
            // for (const x of Object.keys(validation)){
        
            const FieldValue = document.getElementById(validation[x].fieldName) as HTMLInputElement;
            const errorInput = validation[x].TextInput;
            const checkname = new RegExp(validation[x].regexp)
            const type = validation[x].type;
            let error;
            if (FieldValue.value === "")
                error = "";
            else if (FieldValue.value === "true" || FieldValue.value === "false")
                error = "boolean";
            else if (!Number.isNaN(Number(FieldValue.value)))
                error = "number";
            else
                error = "string"
            if (!checkname.test(FieldValue.value)) {
                formIsValid = false;
                console.log(errorInput + " for " + validation[x].fieldName + " : " + FieldValue.value)
            }
            if (error !== type) {
                formIsValid = false;
                console.log("Type Error:The type must be " + type)
            }

        }
        return formIsValid

    }
    submitForm(event: any) {


        if (this.check()) {
            alert("Form submitted");
        } else {
            event.preventDefault();
            alert("Form has errors.");
        }

    }
}
export default SubmitFunction;
export { SubmitFunction }