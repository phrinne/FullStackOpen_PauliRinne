import React from 'react';
import { CoursePart } from '../App'
import Part from './Part';

/*interface ContentProps {
  courseParts: Array<{name: string, exerciseCount: number}>;
}*/

/*const Content = ({ courseParts }: ContentProps) => (
  <>
    {courseParts.map(p => <Part part={p} key={p.name} />)}
  </>
)*/

/*const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => (
  <>
    {courseParts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)}
  </>
)*/
const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => (
  <>
    {courseParts.map(p => <Part key={p.name} part={p} />)}
  </>
)

export default Content;