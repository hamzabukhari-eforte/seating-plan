import { fillSeats } from './occupancy';
import { createRectTable, createRoundTable } from './seatLayout';
import type { Floor } from './types';

export function floor5(): Floor {
  return {
    id: 'floor-5',
    name: '5th Floor',
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
