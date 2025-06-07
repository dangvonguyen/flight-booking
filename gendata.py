import random
import json
from datetime import datetime, timedelta

airports = [
    {"name": "Nội Bài", "iata": "HAN"},
    {"name": "Tân Sơn Nhất", "iata": "SGN"},
    {"name": "Đà Nẵng", "iata": "DAD"},
    {"name": "Cam Ranh", "iata": "CXR"},
    {"name": "Phú Quốc", "iata": "PQC"},
    {"name": "Cần Thơ", "iata": "VCA"},
    {"name": "Vinh", "iata": "VII"},
    {"name": "Huế", "iata": "HUI"},
    {"name": "Chu Lai", "iata": "VCL"},
    {"name": "Buôn Ma Thuột", "iata": "BMV"},
    {"name": "Liên Khương", "iata": "DLI"},
    {"name": "Rạch Giá", "iata": "VKG"},
    {"name": "Tuy Hòa", "iata": "TBB"},
    {"name": "Đồng Hới", "iata": "VDH"},
    {"name": "Pleiku", "iata": "PXU"},
    {"name": "Cà Mau", "iata": "CAH"},
    {"name": "Điện Biên", "iata": "DIN"},
    {"name": "Nha Trang", "iata": "NHA"},
    {"name": "Thọ Xuân", "iata": "THD"},
    {"name": "Kiên Lương", "iata": "XCL"},
]


airlines = [
    {"name": "Vietnam Airlines", "iata": "VN"},
    {"name": "VietJet Air", "iata": "VJ"},
    {"name": "Bamboo Airways", "iata": "QH"},
    {"name": "Pacific Airlines", "iata": "BL"},
]

terminals = ["T1", "T2"]
gates = [f"{chr(65+i)}{random.randint(1,20)}" for i in range(6)]

start_date = datetime(2025, 7, 1)
num_days = 60
scheduled_departures = {}


def create_flight(dep_airport, arr_airport, dep_time, allow_duplicate=False, forced_airline=None):
    dep_key = (dep_airport["iata"], dep_time.strftime('%Y-%m-%dT%H:%M'))
    if not allow_duplicate and dep_key in scheduled_departures:
        return None
    scheduled_departures[dep_key] = True

    duration = random.randint(60, 150)
    arr_time = dep_time + timedelta(minutes=duration)
    airline = forced_airline or random.choice(airlines)

    flight_number = f"{airline['iata']}{random.randint(100,999)}{random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}"

    return {
        "flight_date": dep_time.strftime("%Y-%m-%d"),
        "flight_number": flight_number,
        "departure": {
            "airport": f"Sân bay {dep_airport['name']}",
            "iata": dep_airport["iata"],
            "terminal": random.choice(terminals),
            "gate": random.choice(gates),
            "scheduled": dep_time.strftime("%Y-%m-%dT%H:%M:%S")
        },
        "arrival": {
            "airport": f"Sân bay {arr_airport['name']}",
            "iata": arr_airport["iata"],
            "terminal": random.choice(terminals),
            "gate": random.choice(gates),
            "scheduled": arr_time.strftime("%Y-%m-%dT%H:%M:%S")
        },
        "airline": airline,
        "price": random.randint(800_000, 2_500_000),
        "seats": random.randint(120, 220)
    }


flights = []


for i in range(3):
    dep = random.choice(airports)
    arr1, arr2 = random.sample([a for a in airports if a != dep], 2)
    day = random.randint(0, num_days - 1)
    hour = random.randint(6, 20)
    minute = random.choice([0, 15, 30, 45])
    dep_time = start_date + timedelta(days=day, hours=hour, minutes=minute)
    airline = random.choice(airlines)
    f1 = create_flight(dep, arr1, dep_time, allow_duplicate=True, forced_airline=airline)
    f2 = create_flight(dep, arr2, dep_time, allow_duplicate=True, forced_airline=airline)
    if f1 and f2:
        flights.extend([f1, f2])


while len(flights) < 100:
    dep, arr = random.sample(airports, 2)
    day = random.randint(0, num_days - 1)
    hour = random.randint(5, 22)
    minute = random.choice([0, 15, 30, 45])
    dep_time = start_date + timedelta(days=day, hours=hour, minutes=minute)
    airline = random.choice(airlines)
    flight = create_flight(dep, arr, dep_time, forced_airline=airline)
    if flight:
        flights.append(flight)


with open("flights_vietnam_2025.json", "w", encoding="utf-8") as f:
    json.dump(flights, f, indent=2, ensure_ascii=False)
