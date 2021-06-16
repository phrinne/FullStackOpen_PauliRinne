import React from 'react';
import { CoursePart } from '../App'
import Part from './Part';

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => (
  <>
    {courseParts.map(p => <Part key={p.name} part={p} />)}
  </>
)

export default Content;