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


airlines = {
    "VN": "Vietnam Airlines",
    "VJ": "VietJet Air",
    "QH": "Bamboo Airways",
    "BL": "Pacific Airlines"
}


terminals = ["T1", "T2"]
gates = [f"{chr(65+i)}{random.randint(1,20)}" for i in range(6)]


start_date = datetime(2025, 7, 1)
num_days = 150
flights = []


def generate_flight_number(iata_code):
    return f"{iata_code}{random.randint(100,999)}"


def create_flight(dep_airport, arr_airport, dep_time, airline_code):
    duration = random.randint(60, 150)  # phút
    arr_time = dep_time + timedelta(minutes=duration)
    return {
        "flight_date": dep_time.strftime("%Y-%m-%d"),
        "flight_number": generate_flight_number(airline_code),
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
        "airline": {
            "name": airlines[airline_code],
            "iata": airline_code
        },
        "price": random.randint(800_000, 2_500_000),
        "seats": random.randint(120, 220)
    }


for day_offset in range(num_days):
    current_date = start_date + timedelta(days=day_offset)
    for dep_airport in airports:
        arrivals = [a for a in airports if a != dep_airport]
        for airline_code in ["VN", "VJ"]:
            arr_airport = random.choice(arrivals)
            hour = random.randint(6, 20)
            minute = random.choice([0, 15, 30, 45])
            dep_time = datetime(
                current_date.year, current_date.month, current_date.day, hour, minute
            )
            flight = create_flight(dep_airport, arr_airport, dep_time, airline_code)
            flights.append(flight)


with open("vietnam_flights_2025.json", "w", encoding="utf-8") as f:
    json.dump(flights, f, ensure_ascii=False, indent=2)

