import { createRectTable, createRoundTable } from './seatLayout';
import type { Floor, SeatStatus, Table } from './types';

type Fill = { status: SeatStatus; agentName?: string };

function fillSeats(table: Table, fills: Fill[]): Table {
  return {
    ...table,
    seats: table.seats.map((seat, index) => {
      const fill = fills[index];
      return fill ? { ...seat, ...fill } : seat;
    }),
  };
}

function floorOne(): Floor {
  return {
    id: 'floor-1',
    name: 'Floor 1',
    width: 1100,
    height: 780,
    rooms: [
      {
        id: 'developers',
        name: 'Developers',
        x: 30,
        y: 30,
        width: 400,
        height: 350,
        tables: [
          fillSeats(
            createRectTable('ops-a', {
              x: 80,
              y: 90,
              width: 220,
              height: 90,
              seatsTop: 3,
              seatsBottom: 3,
            }),
            [
              { status: 'active', agentName: 'Ahmed Khan' },
              { status: 'active', agentName: 'Fatima Noor' },
              { status: 'break', agentName: 'Hassan Raza' },
              { status: 'active', agentName: 'Ayesha Malik' },
              { status: 'offline', agentName: 'Usman Ali' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRoundTable('ops-b', {
              x: 130,
              y: 230,
              diameter: 120,
              seatCount: 6,
            }),
            [
              { status: 'active', agentName: 'Zainab Siddiqui' },
              { status: 'absent', agentName: 'Bilal Ahmed' },
              { status: 'active', agentName: 'Maryam Iqbal' },
              { status: 'empty' },
              { status: 'active', agentName: 'Hamza Sheikh' },
              { status: 'break', agentName: 'Sana Farooq' },
            ],
          ),
        ],
      },
      {
        id: 'sales',
        name: 'Sales Team',
        x: 450,
        y: 30,
        width: 620,
        height: 350,
        tables: [
          fillSeats(
            createRectTable('sales-a', {
              x: 500,
              y: 90,
              width: 220,
              height: 90,
              seatsTop: 3,
              seatsBottom: 3,
            }),
            [
              { status: 'active', agentName: 'Saad Mehmood' },
              { status: 'active', agentName: 'Hira Shah' },
              { status: 'active', agentName: 'Omar Farooq' },
              { status: 'absent', agentName: 'Rabia Hussain' },
              { status: 'empty' },
              { status: 'offline', agentName: 'Faisal Qureshi' },
            ],
          ),
          fillSeats(
            createRectTable('sales-b', {
              x: 800,
              y: 90,
              width: 200,
              height: 90,
              seatsTop: 2,
              seatsBottom: 2,
            }),
            [
              { status: 'active', agentName: 'Nimra Aziz' },
              { status: 'break', agentName: 'Danish Anwar' },
              { status: 'active', agentName: 'Laiba Khan' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRoundTable('sales-c', {
              x: 640,
              y: 230,
              diameter: 120,
              seatCount: 8,
            }),
            [
              { status: 'active', agentName: 'Shahzaib Butt' },
              { status: 'active', agentName: 'Amna Tariq' },
              { status: 'offline', agentName: 'Waleed Javed' },
              { status: 'empty' },
              { status: 'active', agentName: 'Iqra Shahid' },
              { status: 'absent', agentName: 'Talha Akhtar' },
              { status: 'active', agentName: 'Bushra Naz' },
              { status: 'empty' },
            ],
          ),
        ],
      },
      {
        id: 'noc',
        name: 'NOC',
        x: 30,
        y: 400,
        width: 520,
        height: 350,
        tables: [
          fillSeats(
            createRectTable('support-a', {
              x: 70,
              y: 470,
              width: 200,
              height: 110,
              seatsTop: 3,
              seatsBottom: 3,
              seatsLeft: 1,
              seatsRight: 1,
            }),
            [
              { status: 'active', agentName: 'Arslan Ashraf' },
              { status: 'active', agentName: 'Mehwish Rauf' },
              { status: 'break', agentName: 'Naveed Saeed' },
              { status: 'active', agentName: 'Sidra Gul' },
              { status: 'empty' },
              { status: 'offline', agentName: 'Kamran Qadri' },
              { status: 'active', agentName: 'Yusra Amin' },
              { status: 'absent', agentName: 'Imran Baig' },
            ],
          ),
          fillSeats(
            createRoundTable('support-b', {
              x: 330,
              y: 510,
              diameter: 140,
              seatCount: 8,
            }),
            [
              { status: 'active', agentName: 'Kiran Bano' },
              { status: 'active', agentName: 'Rizwan Latif' },
              { status: 'empty' },
              { status: 'break', agentName: 'Maham Yousaf' },
              { status: 'active', agentName: 'Asad Ullah' },
              { status: 'empty' },
              { status: 'offline', agentName: 'Farah Jabeen' },
              { status: 'active', agentName: 'Sameer Lodhi' },
            ],
          ),
        ],
      },
      {
        id: 'soc',
        name: 'SOC',
        x: 570,
        y: 400,
        width: 500,
        height: 350,
        tables: [
          fillSeats(
            createRectTable('soc-top', {
              x: 640,
              y: 450,
              width: 360,
              height: 50,
              seatsBottom: 4,
            }),
            [
              { status: 'active', agentName: 'Anum Zahra' },
              { status: 'active', agentName: 'Haroon Mirza' },
              { status: 'break', agentName: 'Saba Rehman' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRectTable('soc-bottom', {
              x: 640,
              y: 680,
              width: 360,
              height: 50,
              seatsTop: 4,
            }),
            [
              { status: 'active', agentName: 'Zohaib Awan' },
              { status: 'offline', agentName: 'Mariam Chaudhry' },
              { status: 'empty' },
              { status: 'active', agentName: 'Umer Dar' },
            ],
          ),
          fillSeats(
            createRectTable('soc-left', {
              x: 590,
              y: 520,
              width: 50,
              height: 140,
              seatsRight: 3,
            }),
            [
              { status: 'active', agentName: 'Areeba Nadeem' },
              { status: 'absent', agentName: 'Junaid Gill' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRectTable('soc-right', {
              x: 1000,
              y: 520,
              width: 50,
              height: 140,
              seatsLeft: 3,
            }),
            [
              { status: 'active', agentName: 'Hafsa Munir' },
              { status: 'break', agentName: 'Adnan Rana' },
              { status: 'active', agentName: 'Kinza Abbasi' },
            ],
          ),
        ],
      },
    ],
  };
}

function floorTwo(): Floor {
  return {
    id: 'floor-2',
    name: 'Floor 2',
    width: 1100,
    height: 780,
    rooms: [
      {
        id: 'qa',
        name: 'QA Lab',
        x: 30,
        y: 30,
        width: 640,
        height: 360,
        tables: [
          fillSeats(
            createRectTable('train-a', {
              x: 80,
              y: 100,
              width: 240,
              height: 90,
              seatsTop: 4,
              seatsBottom: 4,
            }),
            [
              { status: 'active', agentName: 'Salman Zaidi' },
              { status: 'active', agentName: 'Dua Fatima' },
              { status: 'empty' },
              { status: 'active', agentName: 'Taimoor Shah' },
              { status: 'break', agentName: 'Noor-ul-Ain' },
              { status: 'empty' },
              { status: 'offline', agentName: 'Basit Naeem' },
              { status: 'active', agentName: 'Eman Khalid' },
            ],
          ),
          fillSeats(
            createRectTable('train-b', {
              x: 380,
              y: 100,
              width: 220,
              height: 90,
              seatsTop: 3,
              seatsBottom: 3,
            }),
            [
              { status: 'active', agentName: 'Shaheer Azhar' },
              { status: 'absent', agentName: 'Alina Bukhari' },
              { status: 'active', agentName: 'Muneeb Arif' },
              { status: 'empty' },
              { status: 'active', agentName: 'Hania Zafar' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRoundTable('train-c', {
              x: 240,
              y: 250,
              diameter: 110,
              seatCount: 6,
            }),
            [
              { status: 'active', agentName: 'Khizar Hayat' },
              { status: 'empty' },
              { status: 'break', agentName: 'Aima Saleem' },
              { status: 'active', agentName: 'Faizan Gul' },
              { status: 'offline', agentName: 'Zoya Qazi' },
              { status: 'empty' },
            ],
          ),
        ],
      },
      {
        id: 'managers',
        name: 'Managers',
        x: 690,
        y: 30,
        width: 380,
        height: 360,
        tables: [
          fillSeats(
            createRectTable('mgr-a', {
              x: 750,
              y: 100,
              width: 180,
              height: 80,
              seatsTop: 2,
              seatsBottom: 2,
            }),
            [
              { status: 'active', agentName: 'Ibrahim Niazi' },
              { status: 'active', agentName: 'Mahnoor Asif' },
              { status: 'break', agentName: 'Rafay Siddique' },
              { status: 'empty' },
            ],
          ),
          fillSeats(
            createRoundTable('mgr-b', {
              x: 790,
              y: 230,
              diameter: 120,
              seatCount: 5,
            }),
            [
              { status: 'active', agentName: 'Sundas Irfan' },
              { status: 'offline', agentName: 'Ayan Bhatti' },
              { status: 'empty' },
              { status: 'active', agentName: 'Hoorain Ali' },
              { status: 'absent', agentName: 'Moiz Rehman' },
            ],
          ),
        ],
      },
      {
        id: 'lunch',
        name: 'Lunch Area',
        x: 30,
        y: 410,
        width: 380,
        height: 340,
        tables: [
          fillSeats(
            createRectTable('over-a', {
              x: 80,
              y: 500,
              width: 260,
              height: 100,
              seatsTop: 4,
              seatsBottom: 4,
            }),
            [
              { status: 'empty' },
              { status: 'active', agentName: 'Aiza Hashmi' },
              { status: 'empty' },
              { status: 'empty' },
              { status: 'offline', agentName: 'Shayan Mughal' },
              { status: 'empty' },
              { status: 'break', agentName: 'Wania Akram' },
              { status: 'empty' },
            ],
          ),
        ],
      },
      {
        id: 'meeting',
        name: 'Meeting Room',
        x: 430,
        y: 410,
        width: 640,
        height: 340,
        tables: [
          fillSeats(
            createRoundTable('break-a', {
              x: 500,
              y: 500,
              diameter: 140,
              seatCount: 8,
            }),
            [
              { status: 'active', agentName: 'Rayyan Cheema' },
              { status: 'active', agentName: 'Momina Saeed' },
              { status: 'empty' },
              { status: 'absent', agentName: 'Ahad Bashir' },
              { status: 'active', agentName: 'Eshal Riaz' },
              { status: 'break', agentName: 'Zain Ul Abideen' },
              { status: 'empty' },
              { status: 'active', agentName: 'Hoor Fatima' },
            ],
          ),
          fillSeats(
            createRoundTable('break-b', {
              x: 760,
              y: 510,
              diameter: 130,
              seatCount: 6,
            }),
            [
              { status: 'active', agentName: 'Murtaza Khan' },
              { status: 'empty' },
              { status: 'active', agentName: 'Areesha Jamil' },
              { status: 'offline', agentName: 'Hassan Murad' },
              { status: 'empty' },
              { status: 'active', agentName: 'Sanaullah Khan' },
            ],
          ),
        ],
      },
    ],
  };
}

export const floors: Floor[] = [floorOne(), floorTwo()];
