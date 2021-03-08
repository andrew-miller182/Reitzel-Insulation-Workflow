import React from "react";
import FormInput from "./FormInput.js";
import CustomSelect from "./CustomSelect.js";
import ToggleSwitch from "./ToggleSwitch.js";
import Button from "./Button.js";
import Modal from "./Modal.js";

function Form() {
    const data = [
        {
          id: "1",
          name: "One"
        },
        {
          id: "2",
          name: "Two"
        },
        {
          id: "3",
          name: "Three"
        },
        {
          id: "4",
          name: "Four"
        }
      ];
    
      function handleChange(event) {
        console.log(event.target.value);
      }
    
      function onSelectChange(event) {
        console.log(event.target.value);
      }
    
      function onToggleChange(event) {
        console.log(event.target.checked);
      }
    
      return (
        <div className="Form">
          <form>
            <Modal show={true} message={"Hello"}>
              <p>THIS IS IT</p>
            </Modal>
            <FormInput type={"text"} onChange={handleChange} />
            <FormInput type={"email"} onChange={handleChange} />
            <div>
              <CustomSelect data={data} onSelectChange={onSelectChange} />
            </div>
            <div>
              <ToggleSwitch
                id="id"
                defaultChecked={false}
                disabled={false}
                Text={["Yes", "No"]}
                onToggleChange={onToggleChange}
              />
            </div>
            <Button variant="danger" size={"sm"}>
              Small Button
            </Button>
            <Button variant="primary" size={"lg"}>
              Smaller Button
            </Button>
            <Button variant="warning" size={"xs"}>
              Big Button
            </Button>
          </form>
        </div>
      );
  }

  

export default Form;