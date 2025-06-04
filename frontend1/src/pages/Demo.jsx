import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Spinner } from '../components/ui/Spinner'
import FlightCard from '../components/flight/FlightCard'
import SeatSelector from '../components/flight/SeatSelector'
import PassengerForm from '../components/flight/PassengerForm'

const mockFlight = {
  id: 1,
  airline: {
    name: 'Vietnam Airlines',
    logo: 'https://example.com/logo.png',
  },
  flightNumber: 'VN123',
  departureCity: 'Hà Nội',
  arrivalCity: 'TP. Hồ Chí Minh',
  departureTime: '2024-03-20T08:00:00',
  arrivalTime: '2024-03-20T10:00:00',
  duration: 120,
  price: 1500000,
  status: 'on-time',
  aircraft: 'Boeing 787',
  seatClass: 'Economy',
  baggageAllowance: 20,
}

const mockSeats = Array.from({ length: 30 }, (_, i) => ({
  number: `A${i + 1}`,
  isOccupied: Math.random() > 0.8,
}))

export default function Demo() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">UI/UX Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Card Component</h2>
          </Card.Header>
          <Card.Body>
            <p>This is a card body with some content.</p>
          </Card.Body>
          <Card.Footer>
            <Button>Card Footer Button</Button>
          </Card.Footer>
        </Card>

        {/* Button Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Button Component</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex gap-4">
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Input Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Input Component</h2>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              <Input
                label="Default Input"
                placeholder="Enter text..."
              />
              <Input
                label="Required Input"
                required
                placeholder="This field is required"
              />
              <Input
                label="Error Input"
                error="This field has an error"
                placeholder="Error state"
              />
              <Input
                label="Disabled Input"
                disabled
                placeholder="This input is disabled"
              />
            </div>
          </Card.Body>
        </Card>

        {/* FlightCard Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">FlightCard Component</h2>
          </Card.Header>
          <Card.Body>
            <FlightCard
              flight={mockFlight}
              onSelect={() => {}}
            />
          </Card.Body>
        </Card>

        {/* SeatSelector Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">SeatSelector Component</h2>
          </Card.Header>
          <Card.Body>
            <SeatSelector
              seats={mockSeats}
              selectedSeat={selectedSeat}
              onSelect={setSelectedSeat}
            />
          </Card.Body>
        </Card>

        {/* PassengerForm Demo */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">PassengerForm Component</h2>
          </Card.Header>
          <Card.Body>
            <PassengerForm
              onSubmit={handleSubmit}
              initialData={{
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
              }}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
} 