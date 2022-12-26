interface Person {
  name : string
  hairColor: string
  eyeColor: string
}

export function Person({ name, hairColor, eyeColor } : Person) {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
}
