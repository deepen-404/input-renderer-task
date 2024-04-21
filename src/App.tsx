import "./App.css";
import { inputData } from "./constants/checkboxRadioSchema";
import InputRendererTwo from "./components/InputRendererTwo";

function App() {
  return (
    <>
      <form>
        {inputData.map((item) => (
          <InputRendererTwo
            key={item.title}
            mainId={item.id}
            elementToUse={item.multipleSelection.elementToUse}
            title={item.title}
            options={item.options}
            multiSelection={item.multipleSelection.status}
            required={item.required}
            disabled={item.disabled}
          />
        ))}
      </form>
    </>
  );
}

export default App;
