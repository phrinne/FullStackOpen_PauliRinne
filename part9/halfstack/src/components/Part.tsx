import React from 'react';
import { CoursePart } from '../App'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal': {
      return (
        <>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div><i>{part.description}</i></div>
        <br />
        </>
      );
    }
    case 'groupProject': {
      return (
        <>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div>project exercises {part.groupProjectCount}</div>
        <br />
        </>
      );
    }
    case 'submission': {
      return (
        <>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div><i>{part.description}</i></div>
        <div>submit to {part.exerciseSubmissionLink}</div>
        <br />
        </>
      );
    }
    case 'special': {
      return (
        <>
        <strong>{part.name} {part.exerciseCount}</strong>
        <div><i>{part.description}</i></div>
        <div>required skills: {part.requirements.join(', ')}</div>
        <br />
        </>
      );
    }
    default:
      return assertNever(part);
  }
}

export default Part;