import React from 'react'
import HeroSectionInterface from '@/models/hero-section.model'

function HeroSection({name, descriptions, socialLinks}: HeroSectionInterface) {
  return (
    <div>
        <h1>{name}</h1>
        <p>{descriptions[0]}</p>
        <p>{descriptions[1]}</p>
    </div>
  )
}

export default HeroSection