import React from 'react'

interface IProps {
  text: string;
}

export default function Result({ text }:IProps) {
  return (
    <div className="result">{text}</div>
  )
}
