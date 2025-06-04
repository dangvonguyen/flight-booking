import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSearch from '../components/home/HeroSearch'
import PopularDestinations from '../components/home/PopularDestinations'
import SpecialOffers from '../components/home/SpecialOffers'
import Testimonials from '../components/home/Testimonials'

const popularDestinations = [
  {
    name: 'Italy',
    image: '/images/destinations/italy.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_Italy'
  },
  {
    name: 'Brazil',
    image: '/images/destinations/brazil.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_Brazil'
  },
  {
    name: 'America',
    image: '/images/destinations/america.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_the_United_States'
  },
  {
    name: 'Nepal',
    image: '/images/destinations/nepal.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_Nepal'
  },
  {
    name: 'Maldives',
    image: '/images/destinations/maldives.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_the_Maldives'
  },
  {
    name: 'Indonesia',
    image: '/images/destinations/indonesia.jpg',
    link: 'https://en.wikipedia.org/wiki/Tourism_in_Indonesia'
  }
]

const cities = [
  { code: 'del', name: 'Delhi (India)' },
  { code: 'bom', name: 'Mumbai (India)' },
  { code: 'bkk', name: 'Bangkok (Thailand)' },
  { code: 'nrt', name: 'Tokyo (Japan)' },
  { code: 'sin', name: 'Singapore (Singapore)' },
  { code: 'tpe', name: 'Taipei (Taiwan)' },
  { code: 'nyc', name: 'New York (USA)' }
]

export default function Home() {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState('one-way')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [seatClass, setSeatClass] = useState('economy')
  const [showFromCities, setShowFromCities] = useState(false)
  const [showToCities, setShowToCities] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/search', {
      state: {
        tripType,
        fromCity,
        toCity,
        departDate,
        returnDate,
        seatClass
      }
    })
  }

  return (
    <main>
      <HeroSearch />
      <PopularDestinations />
      <SpecialOffers />
      <Testimonials />
    </main>
  )
} 