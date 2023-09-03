import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";
import LearningJavaScript from "./LearningJavaScript";

 function LearningComponent(){
    return (
        <div className="LearningComponent">
            <FirstComponent></FirstComponent>
            <SecondComponent></SecondComponent>
            <ThirdComponent></ThirdComponent>
            <FourthComponent></FourthComponent>
            <LearningJavaScript></LearningJavaScript>
        </div>
    )
}

export default LearningComponent;