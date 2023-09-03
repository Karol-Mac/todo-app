const person = {
    name: "Karol",
    age: 21,
    address: {
        street: "Kwiatowa",
        city: "Dys",
        number: 40
    },
    profiles: ["twitter", "github", "facebook"],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )
    },
}

export default function LearningJavaScript(){
    return(
        <div>
            <div className="LearningJavaScript">{person.name}</div>
            <div className="LearningJavaScript">{person.address.street}</div>
            <div className="LearningJavaScript">{person.printProfile()}</div>
        </div>
    )
}